const puppeteer = require('puppeteer');

const LOGIN_URL = `https://develop.high-mobility.com/login`;
const EMULATOR_URL = `https://develop.high-mobility.com/orgs/6lvA/emulators/1DED8E162D7924ADD3/`;

module.exports = async () => {
  const { TEST_EMAIL, TEST_PASSWORD } = process.env;

  if (TEST_EMAIL && TEST_PASSWORD) {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
      ]
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
    await page.waitFor('.logs .log:nth-child(3)');

    // Set browser reference to close it after tests have finished
    global.__BROWSER__ = browser;
  }
};
