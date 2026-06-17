import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

const USER = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalidUsername',
    password: 'invalidpassword',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
};

test.describe('Login Module', () => {
  test('TC-001: User should login successfully with valid credentials', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(USER.valid.username, USER.valid.password);

    // Assert
    await expect(page).toHaveURL(/inventory/);
    await expect(loginPage.inventoryTitle).toHaveText('Products');
  });

  test('TC-002: User should not login with invalid username', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(USER.invalid.username, USER.valid.password);

    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).toHaveURL('/');
  });

  test('TC-003: User should not login with invalid password', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(USER.valid.username, USER.invalid.password);

    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await expect(page).toHaveURL('/');
  });

  test('TC-004: User should not login with empty username', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login('', USER.valid.password);

    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username is required'
    );
    await expect(page).toHaveURL('/');
  });

  test('TC-005: User should not login with empty password', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(USER.valid.username, '');

    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Password is required'
    );
    await expect(page).toHaveURL('/');
  });

  test('TC-006: User should not login with locked account', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(USER.lockedOut.username, USER.lockedOut.password);

    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
    await expect(page).toHaveURL('/');
  });
});