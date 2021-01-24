const Chance = require('chance');
const { userCredentials } = require('../fixtures/signing');
const SigningPage = require('../pages/signing.page');
const GoogleSignInPage = require('../pages/google-sign-in.page');
const { errorMessages } = require('../support/messages');

const chance = new Chance();

describe('Sign In', () => {
  beforeEach(() => {
    SigningPage.open('/signing');
  });

  afterEach(() => {
    browser.reloadSession();
  });

  it('TA-1: Registered user is able to sign in using valid credentials', () => {
    const { email, password } = userCredentials.emailSignIn.valid;

    SigningPage.signIn(email, password);
    expect(SigningPage.signOutButton.waitForDisplayed()).toBe(true);
  });

  it('TA-2: User unable to sign in with wrong password', () => {
    const { email } = userCredentials.emailSignIn.valid;
    const invalidPassword = chance.word();

    SigningPage.signIn(email, invalidPassword);
    expect(SigningPage.signInError).toHaveText(errorMessages.wrongPassword);
  });

  it('TA-3: User unable to sign in with unregistered email', () => {
    const unregisteredEmail = chance.email();
    const password = chance.word();

    SigningPage.signIn(unregisteredEmail, password);
    expect(SigningPage.signInError).toHaveText(errorMessages.unregisteredEmail);
  });

  it('TA-4: User unable to sign in with missing email', () => {
    const password = chance.word();

    SigningPage.signIn('', password);
    SigningPage.getInvalidField('email').waitForDisplayed();
    expect(SigningPage.signInEmailField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it('TA-5: User unable to sign in with missing password', () => {
    const { email } = userCredentials.emailSignIn.valid;

    SigningPage.signIn(email, '');
    SigningPage.getInvalidField('password').waitForDisplayed();
    expect(SigningPage.signInPasswordField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  xit('TA-6: User is able to sign in using Google', () => {
    const { email, password } = userCredentials.googleSignIn.valid;
    const mainWindowGUID = browser.getWindowHandle();

    SigningPage.startSignInWithGoogle();
    SigningPage.switchToChildWindow(mainWindowGUID);
    GoogleSignInPage.signIn(email, password);
    SigningPage.switchToWindow(mainWindowGUID);
    expect(SigningPage.signOutButton.waitForDisplayed()).toBe(true);
  });

  it('TA-7: User is able to sign out', () => {
    const { email, password } = userCredentials.emailSignIn.valid;

    SigningPage.signIn(email, password);
    SigningPage.signOutButton.waitForDisplayed();
    SigningPage.signOut();
    expect(SigningPage.signInButton.waitForDisplayed()).toBe(true);
  });

  it('TA-7.1: "Sign Up" link in footer should not exist if user is signed in', () => {
    const { email, password } = userCredentials.emailSignIn.valid;

    SigningPage.signIn(email, password);
    expect(SigningPage.signUpFooterLink.waitForDisplayed({ reverse: true }))
      .toBe(true);
  });
});
