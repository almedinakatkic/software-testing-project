OpenCart E-commerce Platform Testing Project

Overview
This repository contains automated tests for the OpenCart platform implemented as part of the SE302 Software Testing and Maintenance course. The tests are written in TypeScript using Playwright.

Prerequisites
Node.js installed on your machine
Node Package Manager(npm)

Setup
Clone the repository to your local machine: 
git clone https://github.com/your-username/QA-Project.git
cd QA-Project
Initialize the project with npm:
npm init
Install Playwright:
npm install @playwright/test
npx playwright install

Running Tests
Run All Tests:
npx playwright test 
Run All Tests (Headed Mode):
npx playwright test --headed
Run Smoke Tests Only:
npx playwright test tests/smoke
Run Regression Tests Only:
npx playwright test tests/regression
Run specific smoke test:
npx playwright test tests/smoke/test-name.spec.ts
Run specific regression test:
npx playwright test tests/regression/test-name.spec.ts

Test Scenarios
Smoke Tests:
Download
Footer
Homepage
Product
Search
Regression Tests:
Blog
Demo
Download
Extensions
Feature
Footer
Navbar
Pagination
Product
Search

Thank you !

