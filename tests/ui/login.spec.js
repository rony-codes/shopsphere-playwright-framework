const {test, expect} = require('@playwright/test')

const USER = {
    valid:{
        username: 'standard_user',
        password: 'secret_sauce'
    },
    invalid: {
        username: 'invalidUsername',
        password: 'invalidpassword'
    },
    lockedOut:{
        username: 'locked_out_user',
        password: 'secret_sauce'
    }
}

test.describe("Login Module", ()=>{
    test.beforeEach('Get the URL',async({page})=>{
        await page.goto('/')
    })

    test('TC-001: User should login successfully with valid credentials', async({page})=>{
        //Arrange
        const usernameInput = page.locator('[data-test="username"]');
        const passwordInput = page.locator('[data-test="password"]');
        const loginButton = page.locator('[data-test="login-button"]');
        const inventoryTitle = page.locator('[data-test="title"]');

        //Act
        await usernameInput.fill(USER.valid.username);
        await passwordInput.fill(USER.valid.password);
        await loginButton.click();

        //Asseert
        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryTitle).toHaveText("Products");
    })


    test('TC-002: User login with invalid username', async({page})=>{
        // Arrange
        const usernameInput = page.locator('[data-test="username"]');
        const passwordInput = page.locator('[data-test="password"]');
        const loginButton = page.locator('[data-test="login-button"]');
        const errorMessage = page.locator('.error-message-container')
        // Act
        await usernameInput.fill(USER.invalid.username);
        await passwordInput.fill(USER.valid.password);
        await loginButton.click();

        // Assert
        await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    test('TC-003: User login with Invalid password', async({page})=>{
        // Arrange
        const usernameInput = page.locator('[data-test="username"]');
        const passwordInput = page.locator('[data-test="password"]');
        const loginButton = page.locator('[data-test="login-button"]');
        const errorMessage = page.locator('.error-message-container')
        // Act
        await usernameInput.fill(USER.valid.username);
        await passwordInput.fill(USER.invalid.password);
        await loginButton.click();

        // Assert
        await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')       
    })



    test('TC-004: User login with Empty username', async({page})=>{
        // Arrange
        const usernameInput = page.locator('[data-test="username"]');
        const passwordInput = page.locator('[data-test="password"]');
        const loginButton = page.locator('[data-test="login-button"]');
        const errorMessage = page.locator('.error-message-container')
        // Act
        await usernameInput.fill('');
        await passwordInput.fill(USER.valid.password);
        await loginButton.click();

        // Assert
        await expect(errorMessage).toHaveText('Epic sadface: Username is required')          
    })

    test('TC-005: User login with Empty password', async({page})=>{
        // Arrange
        const usernameInput = page.locator('[data-test="username"]');
        const passwordInput = page.locator('[data-test="password"]');
        const loginButton = page.locator('[data-test="login-button"]');
        const errorMessage = page.locator('.error-message-container')
        // Act
        await usernameInput.fill(USER.valid.username);
        await passwordInput.fill('');
        await loginButton.click();

        // Assert
        await expect(errorMessage).toHaveText('Epic sadface: Password is required')  
    })


    test('TC-006: User login with Locked user', async({page})=>{
        // Arrange
        const usernameInput = page.locator('[data-test="username"]');
        const passwordInput = page.locator('[data-test="password"]');
        const loginButton = page.locator('[data-test="login-button"]');
        const errorMessage = page.locator('.error-message-container')
        // Act
        await usernameInput.fill(USER.lockedOut.username);
        await passwordInput.fill(USER.lockedOut.password);
        await loginButton.click();

        // Assert
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')  
    })
})