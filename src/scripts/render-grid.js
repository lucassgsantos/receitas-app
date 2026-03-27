window.ReceitasBR = window.ReceitasBR || {};

(() => {
  const app = window.ReceitasBR;
  const { attachImageFallback, createElement, formatDuration, formatServings } =
    app.utils;

  function createFact(label, value, className) {
    return createElement("div", {
      className,
      children: [
        createElement("strong", { text: label }),
        createElement("span", { text: value })
      ]
    });
  }

  function renderCategoryButtons(container, categories, activeCategory, onSelect) {
    const buttons = [
      createElement("button", {
        className: "chip-button",
        type: "button",
        text: "Todas",
        attributes: {
          "aria-pressed": String(activeCategory === "all")
        }
      })
    ];

    buttons[0].addEventListener("click", () => onSelect("all"));

    categories.forEach((category) => {
      const button = createElement("button", {
        className: "chip-button",
        type: "button",
        text: category,
        attributes: {
          "aria-pressed": String(activeCategory === category)
        }
      });

      button.addEventListener("click", () => onSelect(category));
      buttons.push(button);
    });

    container.replaceChildren(...buttons);
  }

  function renderTagSelect(select, options, selectedValue) {
    const fragments = [
      createElement("option", { text: "Todas as tags e origens", attributes: { value: "all" } })
    ];

    options.forEach((option) => {
      fragments.push(
        createElement("option", {
          text: option.label,
          attributes: {
            value: option.value
          }
        })
      );
    });

    select.replaceChildren(...fragments);
    select.value = selectedValue;
  }

  function renderResultsInfo(node, visibleCount, totalCount) {
    const suffix =
      visibleCount === totalCount
        ? "Coleção completa visível."
        : "Use os filtros para ajustar a seleção.";

    node.textContent = `${visibleCount} de ${totalCount} receitas exibidas. ${suffix}`;
  }

  function renderActiveFilters(container, items, onRemove) {
    if (!items.length) {
      container.replaceChildren();
      return;
    }

    const pills = items.map((item) => {
      const removeButton = createElement("button", {
        type: "button",
        text: "×",
        attributes: {
          "aria-label": `Remover filtro ${item.label}`
        }
      });

      removeButton.addEventListener("click", () => onRemove(item.key));

      return createElement("div", {
        className: "active-filter-pill",
        children: [
          createElement("span", { text: item.label }),
          removeButton
        ]
      });
    });

    container.replaceChildren(...pills);
  }

  function createRecipeCard(recipe, onOpenRecipe) {
    const image = createElement("img", {
      className: "recipe-card__image",
      attributes: {
        src: recipe.imagem,
        alt: recipe.nome,
        loading: "lazy",
        decoding: "async"
      }
    });

    attachImageFallback(image, recipe.nome);

    const button = createElement("button", {
      className: "recipe-card__button",
      type: "button",
      attributes: {
        "aria-label": `Abrir receita de ${recipe.nome}`
      },
      children: [
        createElement("div", {
          className: "recipe-card__media",
          children: [
            image,
            createElement("span", {
              className: "recipe-card__chip",
              text: recipe.categoria
            })
          ]
        }),
        createElement("div", {
          className: "recipe-card__body",
          children: [
            createElement("div", {
              className: "recipe-card__chips",
              children: recipe.tags.slice(0, 2).map((tag) =>
                createElement("span", {
                  className: "modal-tag",
                  text: tag
                })
              )
            }),
            createElement("div", {
              children: [
                createElement("h3", { className: "recipe-card__title", text: recipe.nome }),
                createElement("p", {
                  className: "recipe-card__excerpt",
                  text: recipe.resumo
                })
              ]
            }),
            createElement("div", {
              className: "recipe-card__meta",
              children: [
                createFact("Origem", recipe.origem, "recipe-card__fact"),
                createFact("Tempo", formatDuration(recipe.tempoMin), "recipe-card__fact"),
                createFact("Rendimento", formatServings(recipe.porcoes), "recipe-card__fact"),
                createFact("Dificuldade", recipe.dificuldade, "recipe-card__fact")
              ]
            }),
            createElement("span", {
              className: "recipe-card__cta",
              text: "Ver receita"
            })
          ]
        })
      ]
    });

    button.addEventListener("click", () => onOpenRecipe(recipe.id));

    return createElement("article", {
      className: "recipe-card",
      children: [button]
    });
  }

  function renderRecipesGrid(container, recipes, onOpenRecipe) {
    const cards = recipes.map((recipe) => createRecipeCard(recipe, onOpenRecipe));
    container.replaceChildren(...cards);
  }

  app.renderer = {
    renderActiveFilters,
    renderCategoryButtons,
    renderRecipesGrid,
    renderResultsInfo,
    renderTagSelect
  };
})();
