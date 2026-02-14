const searchInput = document.getElementById('search-input')
const searchClear = document.getElementById('search-clear')
const categoriesContainer = document.getElementById('categories-container')
const recipesGrid = document.getElementById('recipes-grid')
const loading = document.getElementById('loading')
const emptyState = document.getElementById('empty-state')
const resultsInfo = document.getElementById('results-info')
const modalOverlay = document.getElementById('modal-overlay')
const modalBody = document.getElementById('modal-body')
const modalClose = document.getElementById('modal-close')

let activeCategory = null
let searchTimeout = null

function filterBySearch(query) {
  const q = query.toLowerCase()
  return receitas.filter(r =>
    r.nome.toLowerCase().includes(q) ||
    r.categoria.toLowerCase().includes(q) ||
    r.origem.toLowerCase().includes(q) ||
    r.ingredientes.some(i => i.nome.toLowerCase().includes(q))
  )
}

function filterByCategory(category) {
  return receitas.filter(r => r.categoria === category)
}

function loadCategories() {
  const allBtn = document.createElement('button')
  allBtn.className = 'category-btn active'
  allBtn.textContent = 'Todos'
  allBtn.addEventListener('click', () => selectCategory(null, allBtn))
  categoriesContainer.appendChild(allBtn)

  categorias.forEach(cat => {
    const btn = document.createElement('button')
    btn.className = 'category-btn'
    btn.textContent = cat
    btn.addEventListener('click', () => selectCategory(cat, btn))
    categoriesContainer.appendChild(btn)
  })
}

function selectCategory(category, btn) {
  searchInput.value = ''
  searchClear.classList.add('hidden')

  document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')

  activeCategory = category

  if (category) {
    const meals = filterByCategory(category)
    renderMeals(meals, `em <strong>${category}</strong>`)
  } else {
    renderMeals(receitas)
  }
}

function renderMeals(meals, label = '') {
  recipesGrid.innerHTML = ''
  loading.classList.add('hidden')
  emptyState.classList.add('hidden')

  if (!meals || meals.length === 0) {
    emptyState.classList.remove('hidden')
    resultsInfo.innerHTML = ''
    return
  }

  if (label) {
    resultsInfo.innerHTML = `<strong>${meals.length}</strong> receitas ${label}`
  } else {
    resultsInfo.innerHTML = `<strong>${meals.length}</strong> receitas`
  }

  meals.forEach((meal, index) => {
    const card = document.createElement('article')
    card.className = 'recipe-card'
    card.style.animationDelay = `${index * 0.06}s`
    card.innerHTML = `
      <div class="recipe-card-img-wrapper">
        <img class="recipe-card-img" src="${meal.imagem}" alt="${meal.nome}" loading="lazy">
        <span class="recipe-card-badge">${meal.categoria}</span>
      </div>
      <div class="recipe-card-body">
        <h3 class="recipe-card-title">${meal.nome}</h3>
        <div class="recipe-card-meta">
          <span>${meal.origem}</span>
          <span>${meal.ingredientes.length} ingredientes</span>
        </div>
      </div>
    `
    card.addEventListener('click', () => openModal(meal.id))
    recipesGrid.appendChild(card)
  })
}

function openModal(mealId) {
  const meal = receitas.find(r => r.id === mealId)
  if (!meal) return

  modalOverlay.classList.remove('hidden')
  document.body.style.overflow = 'hidden'

  modalBody.innerHTML = `
    <img class="modal-hero-img" src="${meal.imagem}" alt="${meal.nome}">
    <div class="modal-content">
      <span class="modal-category">${meal.categoria}</span>
      <h2 class="modal-title">${meal.nome}</h2>
      <p class="modal-area">Origem: ${meal.origem}</p>

      <h3 class="modal-section-title">Ingredientes</h3>
      <div class="modal-ingredients">
        ${meal.ingredientes.map(ing => `
          <div class="ingredient-item">
            <span>${ing.nome}</span>
            <span class="ingredient-measure">${ing.medida}</span>
          </div>
        `).join('')}
      </div>

      <h3 class="modal-section-title">Modo de Preparo</h3>
      <div class="modal-instructions">${meal.instrucoes}</div>
    </div>
  `
}

function closeModal() {
  modalOverlay.classList.add('hidden')
  document.body.style.overflow = ''
  modalBody.innerHTML = ''
}

modalClose.addEventListener('click', closeModal)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal()
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal()
})

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim()

  if (query.length > 0) {
    searchClear.classList.remove('hidden')
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'))
    activeCategory = null
  } else {
    searchClear.classList.add('hidden')
  }

  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (query.length >= 1) {
      const results = filterBySearch(query)
      renderMeals(results, `para "<strong>${query}</strong>"`)
    } else {
      const allBtn = categoriesContainer.querySelector('.category-btn')
      if (allBtn) allBtn.classList.add('active')
      renderMeals(receitas)
    }
  }, 200)
})

searchClear.addEventListener('click', () => {
  searchInput.value = ''
  searchClear.classList.add('hidden')
  const allBtn = categoriesContainer.querySelector('.category-btn')
  if (allBtn) allBtn.classList.add('active')
  renderMeals(receitas)
  searchInput.focus()
})

loadCategories()
renderMeals(receitas)
