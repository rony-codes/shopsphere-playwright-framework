export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.cartItemQuantity = page.locator('[data-test="item-quantity"]');
    this.removeButtons = page.locator('button[data-test^="remove"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async getFirstCartProductName() {
    return await this.cartItemNames.first().textContent();
  }
  
  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartFirstItemPrice() {
    const price = await this.cartItemPrices.first().textContent();
    return Number(price.replace("$", ""));
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickCheckOut(){
    await this.checkoutButton.click();
  }
}
