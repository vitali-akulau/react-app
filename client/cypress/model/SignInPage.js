class SignInPage {
  // Sign in form elements
  signInEmailField = "[data-test='sign-in-email']";
  signInPasswordField = "[data-test='sign-in-password']";
  signInSignInButton = "[data-test='sign-in-submit']";


  fillSignInForm(email, password){
    this.insertField(this.signInEmailField, email);
    this.insertField(this.signInPasswordField, password);
    return this;
  }

  insertField(element, value){
    cy.get(element)
      .clear()
      .type(value);
  }

  clickSignInButton(){
    cy.get(this.signInSignInButton).click();
  }
}

export default new SignInPage();
