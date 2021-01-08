const { userCredentials } = require('../fixtures/signing');
const SigningPage = require('../pages/signing.page');

describe('Sign In', () => {
  it('TA-1: Registered user is able to sign in using valid credentials', () => {
    const { email, password } = userCredentials.emailSignIn.valid;

    SigningPage.open('/signing');
    SigningPage.signIn(email, password);
    SigningPage.signOutButton.waitForDisplayed({ timeout: 5000 });
  });
});
