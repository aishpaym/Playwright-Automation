import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  //Timeout for each action by default
 use: {
    actionTimeout:10 *1000,
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    //to get the all log information we can use trace for retaining on failure 
    trace: 'retain-on-failure',


 },
//max time a test can run for here it is 40 secs or else it will give timeout error
  timeout: 40 * 1000,
//if need to change the timeout at global add the timout second in expect
  expect: {
    timeout: 5000,
  },

  reporter: 'html',

});