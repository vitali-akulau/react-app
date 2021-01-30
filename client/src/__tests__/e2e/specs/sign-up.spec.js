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

  it('TA-8.1: User is unable to sign up with already registered email', () => {
    const name = getUniqueName();
    const { email, password } = userCredentials.emailSignIn.valid;

    SigningPage.signUp(name, email, password);
    expect(SigningPage.signUpError).toHaveText(errorMessages.emailTaken);
  });

  it('TA-9: User unable to sign up with missing Name', () => {
    const email = getUniqueEmail();
    const password = getUniquePassword();

    SigningPage.signUp('', email, password);
    expect(SigningPage.signUpNameField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it('TA-10: User unable to sign up with missing Email', () => {
    const name = getUniqueName();
    const password = getUniquePassword();

    SigningPage.signUp(name, '', password);
    expect(SigningPage.signUpEmailField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it('TA-11: User unable to sign up with missing Password', () => {
    const name = getUniqueName();
    const email = getUniqueEmail();
    const password = getUniquePassword();

    SigningPage.signUp(name, email, '', password);
    expect(SigningPage.signUpPasswordField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it('TA-12: User unable to sign up with missing Confirm Password', () => {
    const name = getUniqueName();
    const email = getUniqueEmail();
    const password = getUniquePassword();

    SigningPage.enterSignUpName(name);
    SigningPage.enterSignUpEmail(email);
    SigningPage.enterSignUpPassword(password);
    SigningPage.enterSignUpConfirmPassword('');
    expect(SigningPage.signUpConfirmPasswordField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it("TA-13: User unable to sign up if Confirm Password doesn't match Password", () => {
    const name = getUniqueName();
    const email = getUniqueEmail();
    const password = getUniquePassword();
    const confirmPassword = getUniqueName();

    SigningPage.signUp(name, email, password, confirmPassword);
    expect(SigningPage.getAlertMessage()).toBe(errorMessages.passwordsDoNotMatch);
  });
});
