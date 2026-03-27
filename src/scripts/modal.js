window.ReceitasBR = window.ReceitasBR || {};

(() => {
  const app = window.ReceitasBR;
  const {
    attachImageFallback,
    createElement,
    formatDuration,
    formatServings,
    getFocusableElements
  } = app.utils;

  function createFact(label, value) {
    return createElement("div", {
      className: "modal-fact",
      children: [
        createElement("strong", { text: label }),
        createElement("span", { text: value })
      ]
    });
  }

  function buildModalContent(recipe) {
    const image = createElement("img", {
      className: "modal-media__image",
      attributes: {
        src: recipe.imagem,
        alt: recipe.nome,
        loading: "eager",
        decoding: "async"
      }
    });

    attachImageFallback(image, recipe.nome);

    return createElement("div", {
      className: "modal-stack",
      children: [
        createElement("div", {
          className: "modal-hero",
          children: [image]
        }),
        createElement("div", {
          className: "modal-content",
          children: [
            createElement("header", {
              className: "modal-header",
              children: [
                createElement("div", {
                  className: "modal-header__chips",
                  children: [
                    createElement("span", {
                      className: "modal-chip",
                      text: recipe.categoria
                    }),
                    createElement("span", {
                      className: "modal-chip",
                      text: recipe.origem
                    })
                  ]
                }),
                createElement("h2", {
                  className: "modal-header__title",
                  text: recipe.nome,
                  attributes: { id: "modal-title" }
                }),
                createElement("p", {
                  className: "modal-header__lede",
                  text: recipe.resumo
                }),
                createElement("div", {
                  className: "modal-header__facts",
                  children: [
                    createFact("Tempo", formatDuration(recipe.tempoMin)),
                    createFact("Rendimento", formatServings(recipe.porcoes)),
                    createFact("Dificuldade", recipe.dificuldade),
                    createFact("Ingredientes", `${recipe.ingredientes.length} itens`)
                  ]
                }),
                createElement("div", {
                  className: "modal-header__tags",
                  children: recipe.tags.map((tag) =>
                    createElement("span", {
                      className: "modal-tag",
                      text: tag
                    })
                  )
                })
              ]
            }),
            createElement("section", {
              className: "modal-section",
              children: [
                createElement("h3", { text: "Ingredientes" }),
                createElement("div", {
                  className: "ingredients-list",
                  children: recipe.ingredientes.map((ingredient) =>
                    createElement("div", {
                      className: "ingredient-item",
                      children: [
                        createElement("strong", { text: ingredient.nome }),
                        createElement("span", { text: ingredient.medida })
                      ]
                    })
                  )
                })
              ]
            }),
            createElement("section", {
              className: "modal-section",
              children: [
                createElement("h3", { text: "Modo de preparo" }),
                createElement("ol", {
                  className: "steps-list",
                  children: recipe.instrucoes.map((step) =>
                    createElement("li", { text: step })
                  )
                })
              ]
            })
          ]
        })
      ]
    });
  }

  function createModalController({ overlay, dialog, body, closeButton, onClose }) {
    let activeRecipeId = null;
    let previousFocusedElement = null;

    function close({ restoreFocus = true } = {}) {
      if (overlay.hidden) {
        return;
      }

      overlay.hidden = true;
      document.body.classList.remove("modal-open");
      body.replaceChildren();
      activeRecipeId = null;

      if (restoreFocus && previousFocusedElement instanceof HTMLElement) {
        previousFocusedElement.focus();
      }

      onClose();
    }

    function trapFocus(event) {
      const focusable = getFocusableElements(dialog);

      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleKeydown(event) {
      if (overlay.hidden) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "Tab") {
        trapFocus(event);
      }
    }

    function open(recipe) {
      if (!recipe) {
        return;
      }

      const shouldRebuild = activeRecipeId !== recipe.id || overlay.hidden;

      previousFocusedElement = document.activeElement;
      activeRecipeId = recipe.id;

      if (shouldRebuild) {
        body.replaceChildren(buildModalContent(recipe));
      }

      overlay.hidden = false;
      document.body.classList.add("modal-open");
      dialog.scrollTop = 0;

      requestAnimationFrame(() => {
        dialog.focus();
      });
    }

    document.addEventListener("keydown", handleKeydown);
    closeButton.addEventListener("click", () => close());
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    return {
      sync(recipe) {
        if (!recipe) {
          close({ restoreFocus: true });
          return;
        }

        open(recipe);
      }
    };
  }

  app.modal = {
    createModalController
  };
})();
