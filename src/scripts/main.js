window.ReceitasBR = window.ReceitasBR || {};

(() => {
  const app = window.ReceitasBR;

  function init() {
    const { filters, modal, renderer, store } = app;
    const elements = {
      searchInput: document.getElementById("search-input"),
      searchClear: document.getElementById("search-clear"),
      categoriesContainer: document.getElementById("categories-container"),
      tagFilter: document.getElementById("tag-filter"),
      sortSelect: document.getElementById("sort-select"),
      resetFilters: document.getElementById("reset-filters"),
      resultsInfo: document.getElementById("results-info"),
      activeFilters: document.getElementById("active-filters"),
      recipesGrid: document.getElementById("recipes-grid"),
      emptyState: document.getElementById("empty-state"),
      emptyReset: document.getElementById("empty-reset"),
      heroCount: document.getElementById("hero-count"),
      heroOrigins: document.getElementById("hero-origins"),
      modalOverlay: document.getElementById("modal-overlay"),
      modalDialog: document.getElementById("recipe-modal"),
      modalBody: document.getElementById("modal-body"),
      modalClose: document.getElementById("modal-close")
    };

    const categories = filters.getCategories();
    const tagOptions = filters.getTagOptions();
    const catalogStats = filters.getCatalogStats();

    elements.heroCount.textContent = String(catalogStats.totalRecipes);
    elements.heroOrigins.textContent = String(catalogStats.totalOrigins);

    renderer.renderTagSelect(elements.tagFilter, tagOptions, "all");

    const modalController = modal.createModalController({
      overlay: elements.modalOverlay,
      dialog: elements.modalDialog,
      body: elements.modalBody,
      closeButton: elements.modalClose,
      onClose: () => {
        if (store.getState().selectedRecipeId !== null) {
          store.setState({ selectedRecipeId: null });
        }
      }
    });

    function removeFilter(key) {
      if (key === "query") {
        store.setState({ query: "" });
      } else if (key === "category") {
        store.setState({ category: "all" });
      } else if (key === "tag") {
        store.setState({ tag: "all" });
      }
    }

    function render() {
      const state = store.getState();
      const recipes = filters.getFilteredRecipes(state);
      const activeFilters = [];

      if (state.query) {
        activeFilters.push({
          key: "query",
          label: `Busca: ${state.query}`
        });
      }

      if (state.category !== "all") {
        activeFilters.push({
          key: "category",
          label: `Categoria: ${state.category}`
        });
      }

      if (state.tag !== "all") {
        activeFilters.push({
          key: "tag",
          label: filters.getTagLabel(state.tag)
        });
      }

      if (elements.searchInput.value !== state.query) {
        elements.searchInput.value = state.query;
      }

      elements.searchClear.hidden = !state.query;
      elements.tagFilter.value = state.tag;
      elements.sortSelect.value = state.sort;

      renderer.renderCategoryButtons(
        elements.categoriesContainer,
        categories,
        state.category,
        (category) => store.setState({ category })
      );

      renderer.renderResultsInfo(
        elements.resultsInfo,
        recipes.length,
        filters.recipes.length
      );

      renderer.renderActiveFilters(
        elements.activeFilters,
        activeFilters,
        removeFilter
      );

      if (recipes.length) {
        elements.emptyState.hidden = true;
        renderer.renderRecipesGrid(elements.recipesGrid, recipes, (recipeId) =>
          store.setState({ selectedRecipeId: recipeId })
        );
      } else {
        elements.recipesGrid.replaceChildren();
        elements.emptyState.hidden = false;
      }

      modalController.sync(filters.getRecipeById(state.selectedRecipeId));
    }

    elements.searchInput.addEventListener("input", (event) => {
      store.setState({ query: event.target.value.trim() });
    });

    elements.searchClear.addEventListener("click", () => {
      store.setState({ query: "" });
      elements.searchInput.focus();
    });

    elements.tagFilter.addEventListener("change", (event) => {
      store.setState({ tag: event.target.value });
    });

    elements.sortSelect.addEventListener("change", (event) => {
      store.setState({ sort: event.target.value });
    });

    elements.resetFilters.addEventListener("click", () => {
      store.resetFilters();
    });

    elements.emptyReset.addEventListener("click", () => {
      store.resetFilters();
    });

    store.subscribe(render);
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
