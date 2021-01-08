const SigningPage = require('../pages/signing.page');

describe('Sign In', () => {
  it('TA-1: User should be able to sign in with valid credentials', () => {
    browser.url('/signing');
    SigningPage.signIn('loripsum@yahoo.com', 'qazwsx123');
    $('div=SIGN OUT').waitForDisplayed({ timeout: 5000 });
  });
});
