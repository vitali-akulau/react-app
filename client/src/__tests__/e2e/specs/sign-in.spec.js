const Chance = require('chance');
const { userCredentials } = require('../fixtures/signing');
const SigningPage = require('../pages/signing.page');
const GoogleSignInPage = require('../pages/google-sign-in.page');
const { errorMessages } = require('../support/messages');
const { signing } = require('../support/relative-urls');

const chance = new Chance();

describe('Sign In', () => {
  const { email: validEmail, password: validPassword } = userCredentials.emailSignIn.valid;

  beforeEach(() => {
    SigningPage.open(signing);
  });

  it('TA-1: Registered user is able to sign in using valid credentials', () => {
    SigningPage.signIn(validEmail, validPassword);
    expect(SigningPage.signOutButton.waitForDisplayed()).toBe(true);
  });

  it('TA-2: User unable to sign in with wrong password', () => {
    const invalidPassword = chance.word();

    SigningPage.signIn(validEmail, invalidPassword);
    expect(SigningPage.signingError).toHaveText(errorMessages.wrongPassword);
  });

  it('TA-3: User unable to sign in with unregistered email', () => {
    const unregisteredEmail = chance.email();

    SigningPage.signIn(unregisteredEmail, validPassword);
    expect(SigningPage.signingError).toHaveText(errorMessages.unregisteredEmail);
  });

  it('TA-4: User unable to sign in with missing email', () => {
    SigningPage.signIn('', validPassword);
    SigningPage.getInvalidField('email').waitForDisplayed();
    expect(SigningPage.signInEmailField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it('TA-5: User unable to sign in with missing password', () => {
    SigningPage.signIn(validEmail, '');
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
    SigningPage.signIn(validEmail, validPassword);
    SigningPage.signOutButton.waitForDisplayed();
    SigningPage.signOut();
    expect(SigningPage.signInButton.waitForDisplayed()).toBe(true);
  });

  it('TA-7.1: "Sign Up" link in footer should not exist if user is signed in', () => {
    SigningPage.signIn(validEmail, validPassword);
    expect(SigningPage.signUpFooterLink.waitForDisplayed({ reverse: true }))
      .toBe(true);
  });
});
