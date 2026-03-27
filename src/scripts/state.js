window.ReceitasBR = window.ReceitasBR || {};

(() => {
  const app = window.ReceitasBR;
  const listeners = new Set();
  const state = {
    query: "",
    category: "all",
    tag: "all",
    sort: "alphabetical",
    selectedRecipeId: null
  };

  function getState() {
    return { ...state };
  }

  function setState(partial) {
    const nextValue =
      typeof partial === "function" ? partial(getState()) : partial;

    if (!nextValue || typeof nextValue !== "object") {
      return;
    }

    Object.assign(state, nextValue);
    listeners.forEach((listener) => listener(getState()));
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function resetFilters() {
    setState({
      query: "",
      category: "all",
      tag: "all",
      sort: "alphabetical"
    });
  }

  app.store = {
    getState,
    resetFilters,
    setState,
    subscribe
  };
})();
