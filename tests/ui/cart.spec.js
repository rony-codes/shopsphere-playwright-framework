import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";

const USER = {
  valid: {
    username: "standard_user",
    password: "secret_sauce",
  },
};

test.describe("Cart Module", () => {
  test("TC-001: User should open cart page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.addFirstProductToCart();

    await cartPage.openCart();

    await expect(page).toHaveURL(/cart/);
  });

  test("TC-002: Cart should show added product name", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    const inventoryProductName = await inventoryPage.getFirstProductName();

    await inventoryPage.addFirstProductToCart();
    await cartPage.openCart();

    const cartProductName = await cartPage.getFirstCartProductName();

    expect(cartProductName).toBe(inventoryProductName);
  });

  test("TC-003: Cart should show product quantity as 1", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartItemQuantity).toHaveText("1");
  });

  test("TC-004: Cart should show correct product price", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);
   
    const inventoryProductPrice = await inventoryPage.getFirstProductPrice();

    await inventoryPage.addFirstProductToCart();
    await cartPage.openCart();

    const cartProductPrice = await cartPage.getCartFirstItemPrice();

    expect (cartProductPrice).toBe(inventoryProductPrice)

  });

  test('TC-005: User should remove product from cart page', async({page})=>{
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.addFirstProductToCart();
    await cartPage.openCart();        

    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.removeFirstItem();

    await expect(cartPage.cartItems).toHaveCount(0);

  })

  test('TC-006: User should continue shopping from cart', async({page})=>{
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USER.valid.username, USER.valid.password);

    await inventoryPage.addFirstProductToCart();
    await cartPage.openCart();  
    
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/)
    
  })
});
