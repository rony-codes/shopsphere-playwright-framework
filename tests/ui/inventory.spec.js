import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

const USER = {
  valid: {
    username: "standard_user",
    password: "secret_sauce",
  },
};

test.describe("Inventory Module", () => {
  test("TC-001:User should see 6 products after login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.pageTitle).toHaveText("Products");

    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBe(6);
  });

  test("TC-002:Verify Product details", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    //NAME
    const nameCount = await inventoryPage.productNames.count();
    expect(nameCount).toBe(6);
    for (let i = 0; i < nameCount; i++) {
      const productName = await inventoryPage.productNames.nth(i).textContent();

      expect(productName).not.toBe("");
    }

    //PRICE
    const priceCount = await inventoryPage.productPrices.count();
    expect(priceCount).toBe(6);
    for (let i = 0; i < priceCount; i++) {
      const price = await inventoryPage.productPrices.nth(i).textContent();

      expect(price).toContain("$");
    }

    //Description
    const descriptionCount = await inventoryPage.productDescriptions.count();
    expect(descriptionCount).toBe(6);
    for (let i = 0; i < descriptionCount; i++) {
      const desciption = await inventoryPage.productDescriptions
        .nth(i)
        .textContent();

      expect(desciption).not.toBe("");
    }

    //Images
    const imagesCount = await inventoryPage.productImages.count();
    expect(imagesCount).toBe(6);
    for (let i = 0; i < imagesCount; i++) {
      await expect(inventoryPage.productImages.nth(i)).toBeVisible();
    }

    //buttons
    const buttonCount = await inventoryPage.addToCartButtons.count();
    expect(buttonCount).toBe(6);

    for (let i = 0; i < buttonCount; i++) {
      await expect(inventoryPage.addToCartButtons.nth(i)).toBeVisible();
    }
  });

  test("TC-007 User should add product to cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.addFirstProductToCart();

    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
  });

  test("TC-008 User should remove product to cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.addFirstProductToCart();

    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");

    await inventoryPage.addToCartButtons.first().click();

    await expect(inventoryPage.shoppingCartBadge).toHaveCount(0);

    await expect(inventoryPage.addToCartButtons.first()).toHaveText(
      "Add to cart",
    );
  });

  test("TC-003: User should sort products from A to Z", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.sortProducts("az");

    const acutalNames = await inventoryPage.getProductName();
    const expectedNames = [...acutalNames].sort();

    expect(acutalNames).toEqual(expectedNames);
  });

  test("TC-004: User should sort products from Z to A", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.sortProducts("za");

    const acutalNames = await inventoryPage.getProductName();
    const expectedNames = [...acutalNames].sort().reverse();

    expect(acutalNames).toEqual(expectedNames);
  });

  test("TC-005: User should sort products by price low to high", async ({page,}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.sortProducts("lohi");

    const actualPrices = await inventoryPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
  });

  test("TC-006: User should sort products by price high to low", async ({page,}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.sortProducts("hilo");

    const actualPrices = await inventoryPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => b - a);

    expect(actualPrices).toEqual(expectedPrices);
  });
});
