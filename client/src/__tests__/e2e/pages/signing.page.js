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

  enterSignInEmail(email) {
    this.signInEmailField.setValue(email);
  }

  enterSignInPassword(password) {
    this.signInPasswordField.setValue(password);
  }

  signIn(email, password) {
    this.enterSignInEmail(email);
    this.enterSignInPassword(password);
    this.submitSignInButton.click();
  }
}

module.exports = new SigningPage();
