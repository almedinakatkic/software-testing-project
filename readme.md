# OpenCart E-commerce Platform Testing Project
---
## Overview
---
This repository contains automated tests for the OpenCart platform implemented as part of the SE302 Software Testing and Maintenance course. The tests are written in TypeScript using Playwright.

## Prerequisites
---
* Node.js installed on your machine
* Node Package Manager(npm)

## Setup
---
1. Clone the repository to your local machine
```bash git clone https://github.com/your-username/QA-Project.git cd QA-Project ```
2. Initialize the project with npm
```bash npm init ```
3. Install Playwright
```bash  npm install @playwright/test npx playwright install```

## Running Tests
---
Run all tests
```bash npx playwright test``` 
Run all tests (headed mode)
```bash npx playwright test --headed``` 
Run smoke tests only
```bash npx playwright test tests/smoke``` 
Run regression tests only
```bash npx playwright test tests/regression``` 
Run specific smoke test
```bash npx playwright test tests/smoke/test-name.spec.ts``` 
Run specific regression test:
```bash npx playwright test tests/regression/test-name.spec.ts``` 

## Test Scenarios
---
1. Smoke Tests
* Download
* Footer
* Homepage
* Product
* Search

2. Regression Tests
* Blog
* Demo
* Download
* Extensions
* Feature
* Footer
* Navbar
* Pagination
* Product
* Search

## Thank you !

