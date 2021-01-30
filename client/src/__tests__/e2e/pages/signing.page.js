const BasePage = require('./basepage.page');

class SigningPage extends BasePage {
  get signInEmailField() {
    return $('[data-test="sign-in-email"]');
  }

  get signInPasswordField() {
    return $('[data-test="sign-in-password"]');
  }

  get submitSignInButton() {
    return $('[data-test="sign-in-submit"]');
  }

  get signingError() {
    return $('[data-test="signing-error"]');
  }

  get signInWithGoogleButton() {
    return $('[data-test="google-sign-in"]');
  }

  get signUpNameField() {
    return $('[data-test="sign-up-name"]');
  }

  get signUpEmailField() {
    return $('[data-test="sign-up-email"]');
  }

  get signUpPasswordField() {
    return $('[data-test="sign-up-password"]');
  }

  get signUpConfirmPasswordField() {
    return $('[data-test="sign-up-confirm-password"]');
  }

  get submitSignUpButton() {
    return $('[data-test="sign-up-submit"]');
  }

  enterSignInEmail(email) {
    this.signInEmailField.setValue(email);
  }

  enterSignInPassword(password) {
    this.signInPasswordField.setValue(password);
  }

  enterSignUpName(name) {
    this.signUpNameField.setValue(name);
  }

  enterSignUpEmail(email) {
    this.signUpEmailField.setValue(email);
  }

  enterSignUpPassword(password) {
    this.signUpPasswordField.setValue(password);
  }

  enterSignUpConfirmPassword(password) {
    this.signUpConfirmPasswordField.setValue(password);
  }

  signIn(email, password) {
    this.enterSignInEmail(email);
    this.enterSignInPassword(password);
    this.submitSignInButton.click();
  }

  signUp(name, email, password, confirmPassword) {
    this.enterSignUpName(name);
    this.enterSignUpEmail(email);
    this.enterSignUpPassword(password);
    this.enterSignUpConfirmPassword(confirmPassword || password);
    this.submitSignUpButton.click();
  }

  startSignInWithGoogle() {
    this.signInWithGoogleButton.click();
  }

  getSignInError() {
    this.signInError.waitForDisplayed();
    return this.signInError.getText();
  }

  getInvalidField(fieldName) {
    return $(`input[name=${fieldName}]`);
  }
}

module.exports = new SigningPage();
