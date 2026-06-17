import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Location of all test files
  testDir: './tests',

  // Run tests in parallel where possible
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests once
  retries: process.env.CI ? 2 : 1,

  // Number of parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Maximum time allowed for a single test
  timeout: 30 * 1000,

  // Shared settings for all tests
  use: {
    // Base URL of the application
    baseURL: 'https://www.saucedemo.com',

    // Show browser while developing
    headless: false,

    // Capture screenshot only if test fails
    screenshot: 'only-on-failure',

    // Keep video only for failed tests
    video: 'retain-on-failure',

    // Save trace on first retry
    trace: 'on-first-retry',
  },

  // Test reports
  reporter: [
    ['list'], // Terminal output
    ['html', { open: 'never' }], // HTML report
  ],

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});