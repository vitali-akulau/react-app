const { keys } = require('../support/keys');

class GoogleSignInPage {
  get emailField() {
    return $('#identifierId');
  }

  get passwordField() {
    return $('[name="password"]');
  }

  signIn(email, password) {
    this.emailField.setValue(email);
    browser.keys(keys.Enter);
    this.passwordField.setValue(password);
    browser.keys(keys.Enter);
  }
}

module.exports = new GoogleSignInPage();
