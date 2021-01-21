const Chance = require('chance');
const { userCredentials } = require('../fixtures/signing');
const SigningPage = require('../pages/signing.page');

const chance = new Chance();

describe('Sign In', () => {
  beforeEach(() => {
    SigningPage.open('/signing');
  });

  it('TA-1: Registered user is able to sign in using valid credentials', () => {
    const { email, password } = userCredentials.emailSignIn.valid;

    SigningPage.signIn(email, password);
    SigningPage.signOutButton.waitForDisplayed();
  });

  it('TA-2: User unable to sign in with wrong password', () => {
    const { email } = userCredentials.emailSignIn.valid;
    const invalidPassword = chance.word();

    SigningPage.signIn(email, invalidPassword);
    SigningPage.signInError.waitForDisplayed();
  });
});
