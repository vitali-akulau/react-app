const Chance = require('chance');
const { userCredentials } = require('../fixtures/signing');
const SigningPage = require('../pages/signing.page');
const { errorMessages } = require('../support/messages');
const { getUniqueEmail, getUniqueName, getUniquePassword } = require('../service/data-providers');

const chance = new Chance();

describe('Sign Up', () => {
  beforeEach(() => {
    SigningPage.open('/signing');
  });

  afterEach(() => {
    browser.reloadSession();
  });

  it('TA-8: User is able to sign up using valid data', () => {
    const name = getUniqueName();
    const email = getUniqueEmail();
    const password = getUniquePassword();

    SigningPage.signUp(name, email, password);
    expect(SigningPage.signOutButton.waitForDisplayed()).toBe(true);
  });
});
