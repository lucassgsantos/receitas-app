const { test, expect } = require("@playwright/test");

test("catálogo, filtros e modal funcionam no fluxo principal", async ({ page }) => {
  let unexpectedDialog = false;
  page.on("dialog", async (dialog) => {
    unexpectedDialog = true;
    await dialog.dismiss();
  });

  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Receitas brasileiras com cara de mesa posta/i
    })
  ).toBeVisible();
  await expect(page.locator(".recipe-card")).toHaveCount(26);

  const searchInput = page.getByLabel(/Buscar por nome, ingrediente ou categoria/i);
  await searchInput.fill("acai");
  await expect(page.locator(".recipe-card")).toHaveCount(1);
  await expect(page.locator(".recipe-card__title")).toContainText("Açaí na Tigela");

  await searchInput.fill("<script>alert(1)</script>");
  await expect(page.locator(".recipe-card")).toHaveCount(0);
  await expect(page.locator("#active-filters")).toContainText("<script>alert(1)</script>");
  expect(unexpectedDialog).toBeFalsy();

  await page.locator("#search-clear").click();
  await expect(page.locator(".recipe-card")).toHaveCount(26);

  await page.getByRole("button", { name: "Sobremesa" }).click();
  await page.locator("#tag-filter").selectOption("origin:Pará");
  await expect(page.locator(".recipe-card")).toHaveCount(1);
  await expect(page.locator(".recipe-card__title")).toContainText("Açaí na Tigela");

  const firstCard = page.getByRole("button", { name: /Abrir receita de Açaí na Tigela/i });
  await firstCard.focus();
  await page.keyboard.press("Enter");

  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("body")).toHaveClass(/modal-open/);
  await expect(page.getByRole("heading", { level: 2, name: "Açaí na Tigela" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("layout mobile não cria overflow horizontal", async ({ browser }) => {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });

  await page.goto("http://127.0.0.1:4173/");

  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  expect(hasHorizontalOverflow).toBeFalsy();
  await expect(page.locator(".recipe-card").first()).toBeVisible();

  await page.close();
});

test("receitas adicionadas usam imagens corretas e o modal não distorce a foto", async ({ page }) => {
  await page.goto("/");

  const imageMap = await page.evaluate(() => {
    const trackedRecipes = [
      "Quindim",
      "Canjica Cremosa",
      "Pamonha Doce",
      "Cuscuz Paulista",
      "Vatapá",
      "Virado à Paulista",
      "Tutu de Feijão",
      "Bauru Tradicional"
    ];

    return Object.fromEntries(
      window.RECEITAS_DATA
        .filter((recipe) => trackedRecipes.includes(recipe.nome))
        .map((recipe) => [recipe.nome, recipe.imagem])
    );
  });

  expect(imageMap["Quindim"]).toContain("assets/images/quindim.jpg");
  expect(imageMap["Canjica Cremosa"]).toContain("assets/images/canjica.jpg");
  expect(imageMap["Pamonha Doce"]).toContain("assets/images/pamonha.jpg");
  expect(imageMap["Cuscuz Paulista"]).toContain("assets/images/cuscuz-paulista.jpg");
  expect(imageMap["Vatapá"]).toContain("assets/images/vatapa.jpg");
  expect(imageMap["Virado à Paulista"]).toContain("assets/images/virado-a-paulista.jpg");
  expect(imageMap["Tutu de Feijão"]).toContain("assets/images/tutu-de-feijao.jpg");
  expect(imageMap["Bauru Tradicional"]).toContain("assets/images/bauru.jpg");

  const searchInput = page.getByLabel(/Buscar por nome, ingrediente ou categoria/i);
  await searchInput.fill("quindim");
  await page.getByRole("button", { name: /Abrir receita de Quindim/i }).click();

  const modalImage = page.locator(".modal-hero img");
  await expect(modalImage).toBeVisible();

  const metrics = await modalImage.evaluate((image) => {
    const rect = image.getBoundingClientRect();
    return {
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      renderedWidth: rect.width,
      renderedHeight: rect.height
    };
  });

  expect(metrics.naturalWidth).toBeGreaterThan(300);
  expect(metrics.naturalHeight).toBeGreaterThan(250);
  expect(metrics.renderedHeight).toBeLessThanOrEqual(430);
  expect(metrics.renderedWidth / metrics.renderedHeight).toBeGreaterThan(1.1);
});
