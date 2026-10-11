// @ts-check
import {  devices } from '@playwright/test';


const config=({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
  reporter: 'html',
  globalSetup: require.resolve('./global-setup'),
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'off',

  } 
  
});

module.exports = config ;

