export class InventoryPage{
    constructor(page){
        this.page = page
        this.pageTitle = page.locator('[data-test="title"]')
        this.productItems = page.locator('[data-test="inventory-item"]')
        this.productNames = page.locator('[data-test="inventory-item-name"]')
        this.productPrices = page.locator('[data-test="inventory-item-price"]')
        this.productDescriptions = page.locator('[data-test="inventory-item-desc"]');
        this.productImages = page.locator('.inventory_item_img img')
        this.addToCartButtons = page.locator('.btn_inventory')
        this.sortDropDown = page.locator('[data-test="product-sort-container"]')
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
    }
    
    async getProductCount(){
        return await this.productItems.count()
    }

    async addFirstProductToCart(){
        await this.addToCartButtons.first().click()
    }

    async getProductName(){
        return await this.productNames.allTextContents();
    }

    async getProductPrices(){
        const prices = await this.productPrices.allTextContents();
        return prices.map((price)=> Number(price.replace('$', '')))
    }

    async sortProducts(option){
        await this.sortDropDown.selectOption(option);
    }

}