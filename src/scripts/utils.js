window.ReceitasBR = window.ReceitasBR || {};

(() => {
  const app = window.ReceitasBR;

  function normalizeText(value = "") {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function formatDuration(minutes) {
    if (!Number.isFinite(minutes) || minutes <= 0) {
      return "Tempo livre";
    }

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;

    if (!remainder) {
      return `${hours} h`;
    }

    return `${hours} h ${remainder} min`;
  }

  function formatServings(servings) {
    return servings === 1 ? "1 porção" : `${servings} porções`;
  }

  function buildImagePlaceholder(label) {
    const safeLabel = String(label).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return entities[character] || character;
    });
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stop-color="#e5d4c2"/>
            <stop offset="100%" stop-color="#d0b59b"/>
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#g)"/>
        <circle cx="120" cy="100" r="72" fill="rgba(163,94,61,0.18)"/>
        <circle cx="700" cy="520" r="96" fill="rgba(55,94,64,0.18)"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#5d2f1b" font-size="34" font-family="Arial, sans-serif">
          ${safeLabel}
        </text>
      </svg>`
    )}`;
  }

  function attachImageFallback(image, label) {
    image.addEventListener(
      "error",
      () => {
        image.src = buildImagePlaceholder(label);
        image.alt = `Imagem ilustrativa de ${label}`;
      },
      { once: true }
    );
  }

  function createElement(tagName, options = {}) {
    const element = document.createElement(tagName);
    const {
      className,
      text,
      html,
      attributes,
      dataset,
      children,
      type
    } = options;

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    if (html !== undefined) {
      element.innerHTML = html;
    }

    if (type) {
      element.type = type;
    }

    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          element.setAttribute(key, value);
        }
      });
    }

    if (dataset) {
      Object.entries(dataset).forEach(([key, value]) => {
        element.dataset[key] = value;
      });
    }

    if (children) {
      children.forEach((child) => {
        if (child) {
          element.appendChild(child);
        }
      });
    }

    return element;
  }

  function getFocusableElements(container) {
    const selectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    return Array.from(container.querySelectorAll(selectors)).filter(
      (node) => !node.hasAttribute("hidden") && node.getAttribute("aria-hidden") !== "true"
    );
  }

  app.utils = {
    attachImageFallback,
    createElement,
    formatDuration,
    formatServings,
    getFocusableElements,
    normalizeText
  };
})();
