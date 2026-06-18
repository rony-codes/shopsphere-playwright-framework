import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { USERS } from '../../test-data/users.js';

test.describe('Login Module', () => {
  test('TC-001: User should login successfully with valid credentials', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(USERS.valid.username, USERS.valid.password);

    // Assert
    await expect(page).toHaveURL(/inventory/);
    await expect(loginPage.inventoryTitle).toHaveText('Products');
  });

  test('TC-002: User should not login with invalid username', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(USERS.invalid.username, USERS.valid.password);

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
    await loginPage.login(USERS.valid.username, USERS.invalid.password);

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
    await loginPage.login('', USERS.valid.password);

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
    await loginPage.login(USERS.valid.username, '');

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
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);

    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
    await expect(page).toHaveURL('/');
  });
});