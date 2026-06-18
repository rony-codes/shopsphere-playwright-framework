import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { USERS } from "../test-data/users.js";


export const test = base.extend({
  loggedInInventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.valid.username, USERS.valid.password);

    await use(inventoryPage);
  },

  loggedInCartPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.valid.username, USERS.valid.password);

    await inventoryPage.addFirstProductToCart();
    await cartPage.openCart();

    await use(cartPage);
  },

  loggedInCheckoutPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.valid.username, USERS.valid.password);

    await inventoryPage.addFirstProductToCart();
    await cartPage.openCart();
    await cartPage.clickCheckOut();

    await use(checkoutPage);
  },
});

export { expect };
