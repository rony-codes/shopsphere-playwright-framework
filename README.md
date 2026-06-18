# ShopSphere Playwright Automation Framework

## Overview

A Playwright-based UI and API Automation Framework built using modern automation engineering practices.

This project demonstrates:

* UI Test Automation
* API Test Automation
* Page Object Model (POM)
* Playwright Fixtures
* Test Data Management
* API Layer Architecture
* GitHub Actions CI/CD
* End-to-End Checkout Flow Testing

---

## Tech Stack

* Playwright
* JavaScript (ES Modules)
* Node.js
* GitHub Actions
* DummyJSON API
* SauceDemo

---

## Project Structure

```text
shopsphere-playwright-framework
│
├── api/
│   ├── ProductAPI.js
│   └── AuthAPI.js
│
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── fixtures/
│   └── uiFixtures.js
│
├── test-data/
│   └── users.js
│
├── tests/
│   ├── ui/
│   │   ├── login.spec.js
│   │   ├── inventory.spec.js
│   │   ├── cart.spec.js
│   │   └── checkout.spec.js
│   │
│   └── api/
│       ├── products.spec.js
│       └── auth.spec.js
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
└── playwright.config.js
```

---

## UI Automation Coverage

### Login Module

* Valid Login
* Invalid Username
* Invalid Password
* Empty Username
* Empty Password
* Locked User Validation

### Inventory Module

* Product Verification
* Product Sorting
* Add Product to Cart
* Remove Product from Cart

### Cart Module

* Open Cart
* Product Validation
* Product Quantity Validation
* Product Price Validation
* Remove Product
* Continue Shopping

### Checkout Module

* Complete Checkout Flow
* Checkout Information Validation
* Cancel Checkout
* Order Confirmation

---

## API Automation Coverage

### Products API

* GET All Products
* GET Single Product
* POST Product
* PUT Product
* PATCH Product
* DELETE Product

### Authentication API

* Login API
* Token Validation
* Authenticated User Retrieval
* Negative Authentication Scenarios

---

## Framework Features

### Page Object Model (POM)

Reusable page classes for maintainable UI automation.

### Fixtures

Reusable test setup for:

* Logged-in Inventory State
* Logged-in Cart State
* Logged-in Checkout State

### Test Data Management

Centralized user credentials and test data.

### API Layer

Reusable API service classes:

* ProductAPI
* AuthAPI

### Continuous Integration

GitHub Actions automatically executes the Playwright test suite on every push and pull request.

---

## Running Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run UI tests:

```bash
npm run test:ui
```

Run API tests:

```bash
npm run test:api
```

Run headed mode:

```bash
npm run headed
```

Open report:

```bash
npm run report
```

---

## Key Learning Outcomes

* Playwright Framework Design
* UI Automation Architecture
* API Automation
* Authentication Testing
* API Chaining
* Fixtures and Test Data Management
* CI/CD Integration using GitHub Actions

---

## Author

Rohan Kumar

Aspiring QA Automation Engineer focused on Playwright, API Testing, and Automation Framework Development.
