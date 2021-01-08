class SigningPage {
  constructor() {
    this.signInEmailField = () => $('[name="email"]');
    this.signInPasswordField = () => $('[name="password"]');
    this.submitSignInButton = () => $('[type="submit"]=Sign In');
  }

  enterSignInEmail(email) {
    this.signInEmailField().setValue(email);
  }

  enterSignInPassword(password) {
    this.signInPasswordField().setValue(password);
  }

  signIn(email, password) {
    this.enterSignInEmail(email);
    this.enterSignInPassword(password);
    this.submitSignInButton().click();
  }
}

module.exports = new SigningPage();
