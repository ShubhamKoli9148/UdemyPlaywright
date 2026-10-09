# Playwright Interview Questions and Answers

## 1. What makes Playwright a good choice for modern web automation?

**Answer:**

Playwright is an open-source automation framework that supports multiple programming languages, including JavaScript, TypeScript, Python, Java, and C#.

One of its biggest advantages is **auto-waiting**, which improves test reliability by waiting for elements to become actionable before performing operations.

It supports three major browser engines: Chromium, Firefox, and WebKit, allowing us to perform cross-browser testing. It also provides features such as parallel execution, API testing, network interception, and automatic screenshots and traces for debugging.

Overall, Playwright is a reliable and powerful choice for modern web application automation.

## 2. Can you explain the relationship between Browser, Browser Context, and Page in Playwright?

**Answer:**

In Playwright, Browser, Browser Context, and Page represent three different levels of the browser architecture.

- **Browser:** Represents the launched browser instance, such as Chromium, Firefox, or WebKit.
- **Browser Context:** Represents an isolated browser session, similar to an incognito window. Each context has its own cookies, local storage, and session storage.
- **Page:** Represents a single tab within a browser context. We use the Page object to interact with web elements, navigate between URLs, and perform actions such as clicking buttons and entering text.

For example, one browser instance can contain multiple browser contexts, and each context can contain multiple pages. This allows us to test different users independently without their session data interfering with each other.

## 3. Pick one Playwright feature and explain its purpose and typical use.

**Answer — Codegen:**

One useful feature of Playwright is **Codegen**. It automatically generates test scripts based on user interactions with a web application.

For example, when I open a login page, enter my username and password, and click the Login button, Codegen records these actions and generates the corresponding Playwright code.

This helps speed up test script creation, especially when starting a new automation project. However, I would review and refine the generated code before using it in a production test framework.

**Example command:**

```bash
npx playwright codegen https://example.com
```

Another useful feature is **Network Interception**, which allows us to monitor network requests, mock API responses, and validate how an application behaves under different network conditions.


## 4. What are locators in Playwright, and which locators do you commonly use?

**Answer:**

Locators are used to identify and interact with elements on a web page. Playwright provides several locator methods, such as `getByRole()`, `getByText()`, `getByLabel()`, `getByPlaceholder()`, and `locator()`.

I prefer user-facing locators like `getByRole()` and `getByLabel()` because they make test scripts more readable and maintainable.

**Example:**

```typescript
await page.getByRole('button', { name: 'Login' }).click();
await page.getByLabel('Email').fill('test@example.com');
await page.getByPlaceholder('Enter password').fill('Test@123');
```

## 5. What is the difference between Selenium and Playwright?

**Answer:**

Both Selenium and Playwright are browser automation tools, but they differ in their architecture and features.

- Playwright provides built-in auto-waiting for locator actions and web-first assertions.
- Playwright supports Chromium, Firefox, and WebKit.
- Playwright includes built-in test runner features such as fixtures, parallel execution, retries, and reporting.
- Selenium supports a broad range of browsers and languages and has a mature ecosystem, including Selenium Grid.

I would choose Playwright for a new modern web automation project when its supported browsers and ecosystem meet the project's requirements.

## 6. What is auto-waiting in Playwright?

**Answer:**

Auto-waiting is a Playwright feature that automatically waits for an element to become ready before performing an action.

For example, before clicking a button, Playwright checks conditions such as whether the element is visible, stable, enabled, and able to receive events.

This reduces flaky tests and eliminates many unnecessary hard-coded waits.

**Example:**

```typescript
await page.getByRole('button', { name: 'Submit' }).click();
```

Playwright automatically waits for the required actionability conditions. If they are not met within the timeout, the action fails with an error.

## 7. What is the difference between `waitForTimeout()`, `waitForSelector()`, and auto-waiting?

**Answer:**

`waitForTimeout()` pauses execution for a fixed duration, whereas `waitForSelector()` waits for a selector to reach a specified state.

Auto-waiting is built into locator actions, so Playwright waits for the necessary conditions automatically.

**Examples:**

```typescript
// Fixed wait — generally avoid in normal test flows
await page.waitForTimeout(3000);

// Wait for an element to become visible
await page.locator('#success-message')
  .waitFor({ state: 'visible' });

// Preferred when the next step is an interaction
await page.getByRole('button', { name: 'Submit' }).click();
```

I prefer auto-waiting and condition-based waits because they make tests more reliable and efficient.

## 8. What are assertions in Playwright? Explain the different types.

**Answer:**

Assertions are used to verify whether the actual application behavior matches the expected result.

Playwright Test provides web-first assertions through the `expect()` function.

Common assertions include:

- `toBeVisible()` — checks whether an element is visible.
- `toHaveText()` — checks the text content of an element.
- `toHaveURL()` — checks the current URL.
- `toHaveTitle()` — checks the page title.
- `toBeEnabled()` — checks whether an element is enabled.
- `toContainText()` — checks whether an element contains the expected text.

**Example:**

```typescript
import { expect } from '@playwright/test';

await expect(page).toHaveTitle(/Dashboard/);

await expect(
  page.getByRole('heading', { name: 'Welcome' })
).toBeVisible();

await expect(page.locator('.message'))
  .toContainText('Login successful');
```

Web-first assertions automatically retry until the condition passes or the assertion timeout is reached.

## 9. How do you handle dropdowns in Playwright?

**Answer:**

For a standard HTML `<select>` dropdown, I use the `selectOption()` method. For custom dropdowns, I interact with the relevant elements using locators.

**Example — standard dropdown:**

```typescript
await page.locator('#country').selectOption('India');

await expect(page.locator('#country'))
  .toHaveValue('India');
```

We can select an option using its value, label, or index.

For a custom dropdown, I would click the dropdown and then select the required option.

```typescript
await page.getByRole('combobox', { name: 'Country' }).click();
await page.getByRole('option', { name: 'India' }).click();
```

The exact locator depends on how the dropdown is implemented in the application.

## 10. How do you handle JavaScript alerts, confirmations, and prompts?

**Answer:**

Playwright provides the `dialog` event to handle JavaScript dialogs, including alerts, confirmations, and prompts.

I can use `dialog.accept()` to accept a dialog and `dialog.dismiss()` to cancel it.

**Example:**

```typescript
page.on('dialog', async dialog => {
  console.log(dialog.message());
  await dialog.accept();
});

await page.getByRole('button', { name: 'Delete' }).click();
```

The dialog handler should be registered before the action that triggers the dialog.

For a confirmation dialog that needs to be cancelled, I would use `dialog.dismiss()` instead.

## 11. How do you handle iframes in Playwright?

**Answer:**

An iframe contains another HTML document embedded inside the main page. Playwright provides `frameLocator()` to locate and interact with elements inside an iframe.

**Example:**

```typescript
const frame = page.frameLocator('#payment-frame');

await frame.getByLabel('Card Number').fill('4111111111111111');

await frame.getByRole('button', { name: 'Pay' }).click();
```

I prefer `frameLocator()` because it allows me to locate elements inside an iframe without manually retrieving the frame object.

## 12. How do you handle multiple tabs or new browser windows?

**Answer:**

In Playwright, each browser tab or window is represented by a `Page` object.

When clicking a link opens a new tab, I use the `context.waitForEvent('page')` method to wait for the new page.

**Example:**

```typescript
const newPagePromise = context.waitForEvent('page');

await page.getByRole('link', { name: 'Open Details' }).click();

const newPage = await newPagePromise;

await newPage.waitForLoadState();

await expect(newPage).toHaveURL(/details/);
```

I use the new `Page` object to interact with the newly opened tab independently of the original page.

## 13. How do you upload and download files in Playwright?

**Answer:**

Playwright provides built-in methods for file uploads and downloads.

For file uploads, I use `setInputFiles()`. For downloads, I wait for the `download` event and then save the downloaded file if required.

**File upload example:**

```typescript
await page.locator('input[type="file"]')
  .setInputFiles('tests/files/resume.pdf');
```

**File download example:**

```typescript
const downloadPromise = page.waitForEvent('download');

await page.getByRole('button', { name: 'Download' }).click();

const download = await downloadPromise;

await download.saveAs(`downloads/${download.suggestedFilename()}`);
```

I would also verify that the uploaded file is accepted or that the downloaded file exists and has the expected name.

## 14. How do you capture screenshots and debug failed Playwright tests?

**Answer:**

Playwright supports screenshots, videos, trace files, and HTML reports to help investigate failures.

I can capture a screenshot manually or configure Playwright to capture screenshots and traces automatically when a test fails.

**Screenshot example:**

```typescript
await page.screenshot({
  path: 'screenshots/homepage.png',
  fullPage: true
});
```

To debug a test interactively, I can use:

```bash
npx playwright test --debug
```

I can also open the HTML report using:

```bash
npx playwright show-report
```

For CI failures, I find trace files especially useful because they provide details about actions, DOM snapshots, network activity, and errors.

## 15. What is network interception in Playwright, and why is it useful?

**Answer:**

Network interception allows me to monitor, modify, block, or mock network requests and responses.

It is useful when testing error scenarios, simulating API responses, and reducing dependency on external services.

**Example: mocking an API response**

```typescript
await page.route('**/api/users', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      { id: 1, name: 'Shubham' }
    ])
  });
});

await page.goto('https://example.com/users');
```

This allows me to test how the UI behaves when the API returns controlled data without relying on the real backend response.

## 16. What are fixtures in Playwright?

**Answer:**

Fixtures provide the setup and teardown required by tests. They help create reusable test environments and share common resources.

Playwright includes built-in fixtures such as `page`, `context`, and `browser`.

For example, the `page` fixture provides a browser page that I can use directly in a test.

**Example:**

```typescript
import { test, expect } from '@playwright/test';

test('verify homepage title', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example/);
});
```

Fixtures reduce duplicate setup code and help keep tests organized and independent.

## 17. How does parallel execution work in Playwright?

**Answer:**

Playwright Test can execute tests in parallel using worker processes. This reduces the total execution time when a suite contains many independent tests.

Parallel execution can be configured using the `workers` option in the Playwright configuration file.

**Example:**

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 4,
  fullyParallel: true
});
```

Here, Playwright is configured to use up to four workers, subject to the available resources and test execution settings.

When running tests in parallel, I ensure that tests do not depend on shared mutable data or interfere with one another.

## 18. What are retries and storage state in Playwright?

**Answer:**

**Retries** allow Playwright to rerun a failed test. They can help identify intermittent failures, although they do not fix the underlying problem.

**Storage state** allows me to save and reuse browser authentication state, such as cookies and local storage, so tests can start with an authenticated session when appropriate.

**Example — configuring retries:**

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 2
});
```

**Example — saving authentication state:**

```typescript
await page.context().storageState({
  path: 'playwright/.auth/user.json'
});
```

I can then configure a test project to reuse that saved state.

In a real project, I would keep authentication files out of source control because they may contain sensitive session information. I would also investigate flaky tests rather than relying on retries alone.
