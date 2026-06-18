import {test, expect} from '../../fixtures/uiFixtures.js'
import { CheckoutPage } from '../../pages/CheckoutPage.js'
import { LoginPage } from '../../pages/LoginPage'
import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'


test.describe('Checkout Module', ()=>{
    
    test('TC-001: User should complete checkout successfully', async({loggedInCheckoutPage})=>{

        await loggedInCheckoutPage.checkOutInformation('Rohan','Kumar','123231')
        await loggedInCheckoutPage.finishOrder();
        await expect(loggedInCheckoutPage.successMessage).toHaveText('Thank you for your order!');
    })

    test('TC-002: Missing first Name', async({loggedInCheckoutPage})=>{
        
        await loggedInCheckoutPage.fillFirstName('')
        await loggedInCheckoutPage.fillLastName('Kumar')
        await loggedInCheckoutPage.fillPostCard('145001')
        await loggedInCheckoutPage.clickContinue();

        await expect(loggedInCheckoutPage.errorMessage).toHaveText('Error: First Name is required')

    })


    test('TC-003: Missing last Name', async({loggedInCheckoutPage})=>{
        
        await loggedInCheckoutPage.fillFirstName('Rohan')
        await loggedInCheckoutPage.fillLastName('')
        await loggedInCheckoutPage.fillPostCard('145001')
        await loggedInCheckoutPage.clickContinue();

        await expect(loggedInCheckoutPage.errorMessage).toHaveText('Error: Last Name is required')
    })

    test('TC-004: Missing postat code', async({loggedInCheckoutPage})=>{
        
        await loggedInCheckoutPage.fillFirstName('Rohan')
        await loggedInCheckoutPage.fillLastName('Kumar')
        await loggedInCheckoutPage.fillPostCard('')
        await loggedInCheckoutPage.clickContinue();

        await expect(loggedInCheckoutPage.errorMessage).toHaveText('Error: Postal Code is required')
    })

    test('TC-005: Cancel Checkout', async({loggedInCheckoutPage, page})=>{

        await loggedInCheckoutPage.clickCancel();
        await expect(page).toHaveURL(/cart/)
    })
})