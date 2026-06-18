import {test,expect} from "../../fixtures/uiFixtures"
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";


test.describe("Cart Module", () => {
  test("TC-001: User should open cart page", async ({ loggedInCartPage, page }) => {

    await expect(page).toHaveURL(/cart/);
  });

  test("TC-002: Cart should show added product name", async ({ loggedInCartPage }) => {

    const cartProductName = await loggedInCartPage.getFirstCartProductName();

    expect(cartProductName).not.toBe('')
  });

  test("TC-003: Cart should show product quantity as 1", async ({ loggedInCartPage }) => {

    await expect(loggedInCartPage.cartItemQuantity).toHaveText("1");
  });

  test("TC-004: Cart should show correct product price", async ({ loggedInCartPage }) => {

    const cartProductPrice = await loggedInCartPage.getCartFirstItemPrice();

    expect (cartProductPrice).toBe(29.99)

  });

  test('TC-005: User should remove product from cart page', async({loggedInCartPage})=>{      

    await expect(loggedInCartPage.cartItems).toHaveCount(1);
    await loggedInCartPage.removeFirstItem();

    await expect(loggedInCartPage.cartItems).toHaveCount(0);

  })

  test('TC-006: User should continue shopping from cart', async({loggedInCartPage,page})=>{

    await loggedInCartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/)
    
  })
});
