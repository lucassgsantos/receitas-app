const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const categoriesContainer = document.getElementById('categories-container');
const recipesGrid = document.getElementById('recipes-grid');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const resultsInfo = document.getElementById('results-info');
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

let activeCategory = null;
let searchTimeout = null;

async function fetchCategories() {
    const res = await fetch(`${API_BASE}/categories.php`);
    const data = await res.json();
    return data.categories || [];
}

async function searchMeals(query) {
    const res = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.meals || [];
}

async function filterByCategory(category) {
    const res = await fetch(`${API_BASE}/filter.php?c=${encodeURIComponent(category)}`);
    const data = await res.json();
    return data.meals || [];
}

async function getMealById(id) {
    const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
}

async function getRandomMeals() {
    const res = await fetch(`${API_BASE}/search.php?s=`);
    const data = await res.json();
    return data.meals || [];
}

async function loadCategories() {
    try {
        const categories = await fetchCategories();
        const allBtn = document.createElement('button');
        allBtn.className = 'category-btn active';
        allBtn.textContent = '🔥 Todos';
        allBtn.addEventListener('click', () => selectCategory(null, allBtn));
        categoriesContainer.appendChild(allBtn);

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.innerHTML = `
                <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}" loading="lazy">
                ${cat.strCategory}
            `;
            btn.addEventListener('click', () => selectCategory(cat.strCategory, btn));
            categoriesContainer.appendChild(btn);
        });
    } catch (err) {
        console.error('Erro ao carregar categorias:', err);
    }
}

function selectCategory(category, btn) {
    searchInput.value = '';
    searchClear.classList.add('hidden');

    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeCategory = category;

    if (category) {
        loadMealsByCategory(category);
    } else {
        loadInitialMeals();
    }
}

function renderMeals(meals, label = '') {
    recipesGrid.innerHTML = '';
    loading.classList.add('hidden');
    emptyState.classList.add('hidden');

    if (!meals || meals.length === 0) {
        emptyState.classList.remove('hidden');
        resultsInfo.innerHTML = '';
        return;
    }

    if (label) {
        resultsInfo.innerHTML = `Mostrando <strong>${meals.length}</strong> receitas ${label}`;
    } else {
        resultsInfo.innerHTML = `<strong>${meals.length}</strong> receitas encontradas`;
    }

    meals.forEach((meal, index) => {
        const card = document.createElement('article');
        card.className = 'recipe-card';
        card.style.animationDelay = `${index * 0.06}s`;
        card.innerHTML = `
            <div class="recipe-card-img-wrapper">
                <img class="recipe-card-img" src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
                ${meal.strCategory ? `<span class="recipe-card-badge">${meal.strCategory}</span>` : ''}
            </div>
            <div class="recipe-card-body">
                <h3 class="recipe-card-title">${meal.strMeal}</h3>
                <div class="recipe-card-meta">
                    ${meal.strArea ? `<span>📍 ${meal.strArea}</span>` : ''}
                    ${meal.strTags ? `<span>🏷️ ${meal.strTags.split(',')[0]}</span>` : ''}
                </div>
            </div>
        `;
        card.addEventListener('click', () => openModal(meal.idMeal));
        recipesGrid.appendChild(card);
    });
}

async function loadInitialMeals() {
    showLoading();
    try {
        const meals = await getRandomMeals();
        renderMeals(meals, '— Destaques');
    } catch (err) {
        console.error('Erro ao carregar receitas:', err);
        renderMeals([]);
    }
}

async function loadMealsByCategory(category) {
    showLoading();
    try {
        const meals = await filterByCategory(category);
        renderMeals(meals, `em <strong>${category}</strong>`);
    } catch (err) {
        console.error('Erro ao filtrar por categoria:', err);
        renderMeals([]);
    }
}

async function loadMealsBySearch(query) {
    showLoading();
    try {
        const meals = await searchMeals(query);
        renderMeals(meals, `para "<strong>${query}</strong>"`);
    } catch (err) {
        console.error('Erro na busca:', err);
        renderMeals([]);
    }
}

function showLoading() {
    recipesGrid.innerHTML = '';
    emptyState.classList.add('hidden');
    resultsInfo.innerHTML = '';
    loading.classList.remove('hidden');
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();

    if (query.length > 0) {
        searchClear.classList.remove('hidden');
    } else {
        searchClear.classList.add('hidden');
    }

    if (query.length > 0) {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        activeCategory = null;
    }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (query.length >= 2) {
            loadMealsBySearch(query);
        } else if (query.length === 0) {
            const allBtn = categoriesContainer.querySelector('.category-btn');
            if (allBtn) allBtn.classList.add('active');
            loadInitialMeals();
        }
    }, 400);
});

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.add('hidden');
    const allBtn = categoriesContainer.querySelector('.category-btn');
    if (allBtn) allBtn.classList.add('active');
    loadInitialMeals();
    searchInput.focus();
});

async function openModal(mealId) {
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    modalBody.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
            <div class="spinner"></div>
        </div>
    `;

    try {
        const meal = await getMealById(mealId);
        if (!meal) {
            closeModal();
            return;
        }

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    name: ingredient.trim(),
                    measure: measure ? measure.trim() : '',
                    thumb: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient.trim())}-Small.png`
                });
            }
        }

        modalBody.innerHTML = `
            <img class="modal-hero-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="modal-content">
                ${meal.strCategory ? `<span class="modal-category">${meal.strCategory}</span>` : ''}
                <h2 class="modal-title">${meal.strMeal}</h2>
                ${meal.strArea ? `<p class="modal-area">📍 Origem: ${meal.strArea}</p>` : ''}

                <h3 class="modal-section-title">🥘 Ingredientes</h3>
                <div class="modal-ingredients">
                    ${ingredients.map(ing => `
                        <div class="ingredient-item">
                            <img src="${ing.thumb}" alt="${ing.name}" loading="lazy" onerror="this.style.display='none'">
                            <span>${ing.name}</span>
                            ${ing.measure ? `<span class="ingredient-measure">${ing.measure}</span>` : ''}
                        </div>
                    `).join('')}
                </div>

                <h3 class="modal-section-title">📝 Modo de Preparo</h3>
                <div class="modal-instructions">${meal.strInstructions || 'Instruções não disponíveis.'}</div>

                ${meal.strYoutube ? `
                    <a href="${meal.strYoutube}" target="_blank" rel="noopener" class="modal-video-btn">
                        ▶ Assistir no YouTube
                    </a>
                ` : ''}
            </div>
        `;
    } catch (err) {
        console.error('Erro ao carregar detalhes:', err);
        closeModal();
    }
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

async function init() {
    await loadCategories();
    await loadInitialMeals();
}

init();
