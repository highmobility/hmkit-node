/*
 *  The MIT License
 * 
 *  Copyright (c) 2014- High-Mobility GmbH (https://high-mobility.com)
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 * 
 *  globalSetup.js
 * 
 *  Created by Mikk Õun on 20/01/2020.
 */

const puppeteer = require('puppeteer');

const LOGIN_URL = `https://develop.high-mobility.net/login`;
const EMULATOR_URL = `https://develop.high-mobility.net/emulators/mX0m/17ADD920644AA1413E`;

module.exports = async () => {
  const { TEST_EMAIL, TEST_PASSWORD } = process.env;

  if (TEST_EMAIL && TEST_PASSWORD) {
    console.log('Running global setup...');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
    const page = await browser.newPage();

    // Log in
    await page.goto(LOGIN_URL);
    await page.waitFor('#email');
    await page.type('#email', TEST_EMAIL);
    await page.type('#password', TEST_PASSWORD);
    await page.click('form button');
    await page.waitFor('.default-avatar');

    // Open emulator and wait until it has initialized
    await page.goto(EMULATOR_URL);
    await page.waitFor('.logs .log:nth-child(4)');

    // Set browser reference to close it after tests have finished
    global.__BROWSER__ = browser;
  }
};
