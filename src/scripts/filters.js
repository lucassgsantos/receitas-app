window.ReceitasBR = window.ReceitasBR || {};

(() => {
  const app = window.ReceitasBR;
  const { normalizeText } = app.utils;
  const recipes = window.RECEITAS_DATA || [];

  function getCategories() {
    return Array.from(new Set(recipes.map((recipe) => recipe.categoria)));
  }

  function getOrigins() {
    return Array.from(new Set(recipes.map((recipe) => recipe.origem))).sort((a, b) =>
      a.localeCompare(b, "pt-BR")
    );
  }

  function getTags() {
    return Array.from(
      new Set(recipes.flatMap((recipe) => recipe.tags))
    ).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }

  function getTagOptions() {
    return [
      ...getOrigins().map((origin) => ({
        value: `origin:${origin}`,
        label: `Origem: ${origin}`
      })),
      ...getTags().map((tag) => ({
        value: `tag:${tag}`,
        label: `Tag: ${tag}`
      }))
    ];
  }

  function getTagLabel(value) {
    if (!value || value === "all") {
      return "";
    }

    const [kind, label] = value.split(":");

    if (kind === "origin") {
      return `Origem: ${label}`;
    }

    return `Tag: ${label}`;
  }

  function matchesSearch(recipe, query) {
    if (!query) {
      return true;
    }

    const haystack = [
      recipe.nome,
      recipe.categoria,
      recipe.origem,
      recipe.resumo,
      recipe.tags.join(" "),
      recipe.ingredientes.map((ingredient) => ingredient.nome).join(" "),
      recipe.instrucoes.join(" ")
    ]
      .map(normalizeText)
      .join(" ");

    return haystack.includes(normalizeText(query));
  }

  function matchesCategory(recipe, category) {
    return category === "all" || recipe.categoria === category;
  }

  function matchesTag(recipe, value) {
    if (!value || value === "all") {
      return true;
    }

    const [kind, label] = value.split(":");

    if (kind === "origin") {
      return recipe.origem === label;
    }

    return recipe.tags.includes(label);
  }

  function sortRecipes(items, sort) {
    const sorted = [...items];

    switch (sort) {
      case "ingredients":
        sorted.sort((a, b) => {
          const diff = a.ingredientes.length - b.ingredientes.length;
          return diff || a.nome.localeCompare(b.nome, "pt-BR");
        });
        return sorted;
      case "fastest":
        sorted.sort((a, b) => {
          const diff = a.tempoMin - b.tempoMin;
          return diff || a.nome.localeCompare(b.nome, "pt-BR");
        });
        return sorted;
      case "alphabetical":
      default:
        sorted.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
        return sorted;
    }
  }

  function getFilteredRecipes(state) {
    return sortRecipes(
      recipes.filter(
        (recipe) =>
          matchesSearch(recipe, state.query) &&
          matchesCategory(recipe, state.category) &&
          matchesTag(recipe, state.tag)
      ),
      state.sort
    );
  }

  function getRecipeById(recipeId) {
    return recipes.find((recipe) => recipe.id === recipeId) || null;
  }

  function getCatalogStats() {
    return {
      totalRecipes: recipes.length,
      totalOrigins: getOrigins().length
    };
  }

  app.filters = {
    getCategories,
    getCatalogStats,
    getFilteredRecipes,
    getRecipeById,
    getTagLabel,
    getTagOptions,
    recipes
  };
})();
