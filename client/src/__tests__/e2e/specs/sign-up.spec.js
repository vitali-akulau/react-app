const { userCredentials } = require('../fixtures/signing');
const SigningPage = require('../pages/signing.page');
const { errorMessages } = require('../support/messages');
const User = require('../service/seeds/User');
const { getUniqueName } = require('../service/data-providers');

describe('Sign Up', () => {
  let credentials;
  const emptyValue = '';

  beforeEach(() => {
    credentials = new User();

    SigningPage.open('/signing');
  });

  it('TA-8: User is able to sign up using valid data', () => {
    SigningPage.signUp(credentials);
    expect(SigningPage.signOutButton.waitForDisplayed()).toBe(true);
  });

  it('TA-8.1: User is unable to sign up with already registered email', () => {
    const registeredUserCredentials = {
      ...credentials,
      ...userCredentials.emailSignIn.valid,
    };

    SigningPage.signUp(registeredUserCredentials);
    expect(SigningPage.signingError).toHaveText(errorMessages.emailTaken);
  });

  it('TA-9: User unable to sign up with missing Name', () => {
    credentials.name = emptyValue;

    SigningPage.signUp(credentials);
    expect(SigningPage.signUpNameField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it('TA-10: User unable to sign up with missing Email', () => {
    credentials.email = emptyValue;

    SigningPage.signUp(credentials);
    expect(SigningPage.signUpEmailField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it('TA-11: User unable to sign up with missing Password', () => {
    credentials.password = emptyValue;

    SigningPage.signUp(credentials);
    expect(SigningPage.signUpPasswordField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it('TA-12: User unable to sign up with missing Confirm Password', () => {
    const { name, email, password } = credentials;

    SigningPage.enterSignUpName(name);
    SigningPage.enterSignUpEmail(email);
    SigningPage.enterSignUpPassword(password);
    SigningPage.enterSignUpConfirmPassword('');
    expect(SigningPage.signUpConfirmPasswordField.getAttribute('validationMessage'))
      .toBe(errorMessages.emptyRequiredField);
  });

  it("TA-13: User unable to sign up if Confirm Password doesn't match Password", () => {
    credentials.confirmPassword = getUniqueName();

    SigningPage.signUp(credentials);
    expect(SigningPage.getAlertMessage()).toBe(errorMessages.passwordsDoNotMatch);
  });

  it('TA-15: User unable to sign up with invalid Email', () => {
    credentials.email = getUniqueName();

    SigningPage.signUp(credentials);
    expect(SigningPage.signUpEmailField.getAttribute('validationMessage'))
      .toBe(errorMessages.emailNotContainingAt(credentials.email));
  });

  it('TA-16: User unable to sign up with too short Password', () => {
    credentials.password = getUniqueName().slice(0, 5);

    SigningPage.signUp(credentials);
    expect(SigningPage.signingError).toHaveText(errorMessages.tooShortPassword);
  });
});
