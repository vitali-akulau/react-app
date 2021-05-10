class SignInPage {
  // Sign in form elements
  signInBase = "div [data-test='header'] + div > div > div:first-child > form > div > input";
  signInEmailField = this.signInBase + "[type='email']";
  signInPasswordField = this.signInBase + "[type='password']";
  signInSignInButton = "button[data-test='sign-in-submit']";


  fillSignInForm(email, password){
    this.insertField(this.signInEmailField, email);
    this.insertField(this.signInPasswordField, password);
    return this;
  }

  insertField (element, value){
    cy.get(element)
      .clear()
      .type(value);
  }

  clickSignInButton(){
    cy.get(this.signInSignInButton).click();
  }
}
export default new SignInPage();
