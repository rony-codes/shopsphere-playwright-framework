import {test, expect} from "../../fixtures/uiFixtures.js"
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

test.describe("Inventory Module", () => {
  test("TC-001:User should see 6 products after login", async ({loggedInInventoryPage}) => {
    const productCount= await loggedInInventoryPage.getProductCount();
    expect(productCount).toBe(6);
  });

  test("TC-002:Verify Product details", async ({ loggedInInventoryPage }) => {

    //NAME
    const nameCount = await loggedInInventoryPage.productNames.count();
    expect(nameCount).toBe(6);
    for (let i = 0; i < nameCount; i++) {
      const productName = await loggedInInventoryPage.productNames.nth(i).textContent();

      expect(productName).not.toBe("");
    }

    //PRICE
    const priceCount = await loggedInInventoryPage.productPrices.count();
    expect(priceCount).toBe(6);
    for (let i = 0; i < priceCount; i++) {
      const price = await loggedInInventoryPage.productPrices.nth(i).textContent();

      expect(price).toContain("$");
    }

    //Description
    const descriptionCount = await loggedInInventoryPage.productDescriptions.count();
    expect(descriptionCount).toBe(6);
    for (let i = 0; i < descriptionCount; i++) {
      const desciption = await loggedInInventoryPage.productDescriptions
        .nth(i)
        .textContent();

      expect(desciption).not.toBe("");
    }

    //Images
    const imagesCount = await loggedInInventoryPage.productImages.count();
    expect(imagesCount).toBe(6);
    for (let i = 0; i < imagesCount; i++) {
      await expect(loggedInInventoryPage.productImages.nth(i)).toBeVisible();
    }

    //buttons
    const buttonCount = await loggedInInventoryPage.addToCartButtons.count();
    expect(buttonCount).toBe(6);

    for (let i = 0; i < buttonCount; i++) {
      await expect(loggedInInventoryPage.addToCartButtons.nth(i)).toBeVisible();
    }
  });

  test("TC-007 User should add product to cart", async ({ loggedInInventoryPage }) => {

    await loggedInInventoryPage.addFirstProductToCart();

    await expect(loggedInInventoryPage.shoppingCartBadge).toHaveText("1");
  });

  test("TC-008 User should remove product to cart", async ({ loggedInInventoryPage }) => {

    await loggedInInventoryPage.addFirstProductToCart();

    await expect(loggedInInventoryPage.shoppingCartBadge).toHaveText("1");

    await loggedInInventoryPage.addToCartButtons.first().click();

    await expect(loggedInInventoryPage.shoppingCartBadge).toHaveCount(0);

    await expect(loggedInInventoryPage.addToCartButtons.first()).toHaveText(
      "Add to cart",
    );
  });

  test("TC-003: User should sort products from A to Z", async ({ loggedInInventoryPage }) => {

    await loggedInInventoryPage.sortProducts("az");

    const acutalNames = await loggedInInventoryPage.getProductName();
    const expectedNames = [...acutalNames].sort();

    expect(acutalNames).toEqual(expectedNames);
  });

  test("TC-004: User should sort products from Z to A", async ({ loggedInInventoryPage }) => {

    await loggedInInventoryPage.sortProducts("za");

    const acutalNames = await loggedInInventoryPage.getProductName();
    const expectedNames = [...acutalNames].sort().reverse();

    expect(acutalNames).toEqual(expectedNames);
  });

  test("TC-005: User should sort products by price low to high", async ({loggedInInventoryPage}) => {


    await loggedInInventoryPage.sortProducts("lohi");

    const actualPrices = await loggedInInventoryPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
  });

  test("TC-006: User should sort products by price high to low", async ({loggedInInventoryPage}) => {

    await loggedInInventoryPage.sortProducts("hilo");

    const actualPrices = await loggedInInventoryPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => b - a);

    expect(actualPrices).toEqual(expectedPrices);
  });
});
