import {test, expect} from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { InventoryPage } from '../../pages/InventoryPage'
import { CheckoutPage } from '../../pages/CheckoutPagae'
import { CartPage } from '../../pages/CartPage'

const USER = {
  valid: {
    username: "standard_user",
    password: "secret_sauce",
  },
};

test.describe('Checkout Module', ()=>{
    
    test('TC-001: User should complete checkout successfully', async({page})=>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(USER.valid.username, USER.valid.password);

        await inventoryPage.addFirstProductToCart();
        await cartPage.openCart();     

        await cartPage.checkoutButton.click();
        await checkoutPage.checkOutInformation('Rohan','Kumar','123231')

        await checkoutPage.finishOrder();

        await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
    })

    test('TC-002: Missing first Name', async({page})=>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(USER.valid.username, USER.valid.password);

        await inventoryPage.addFirstProductToCart();
        await cartPage.openCart();     

        await cartPage.checkoutButton.click();
        
        await checkoutPage.fillFirstName('')
        await checkoutPage.fillLastName('Kumar')
        await checkoutPage.fillPostCard('145001')
        await checkoutPage.clickContinue();

        await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required')

    })


    test('TC-003: Missing last Name', async({page})=>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(USER.valid.username, USER.valid.password);

        await inventoryPage.addFirstProductToCart();
        await cartPage.openCart();     

        await cartPage.checkoutButton.click();
        
        await checkoutPage.fillFirstName('Rohan')
        await checkoutPage.fillLastName('')
        await checkoutPage.fillPostCard('145001')
        await checkoutPage.clickContinue();

        await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required')
    })

    test('TC-004: Missing postat code', async({page})=>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(USER.valid.username, USER.valid.password);

        await inventoryPage.addFirstProductToCart();
        await cartPage.openCart();     

        await cartPage.checkoutButton.click();
        
        await checkoutPage.fillFirstName('Rohan')
        await checkoutPage.fillLastName('Kumar')
        await checkoutPage.fillPostCard('')
        await checkoutPage.clickContinue();

        await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required')
    })

    test('TC-005: Cancel Checkout', async({page})=>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(USER.valid.username, USER.valid.password);

        await inventoryPage.addFirstProductToCart();
        await cartPage.openCart();     

        await cartPage.clickCheckOut();

        await checkoutPage.clickCancel();
        await expect(page).toHaveURL(/cart/)
    })
})