class SignInPage {
  // Sign in form elements
  signInTitle = "[data-test='sign-in-title']"
  signInEmailField = "[data-test='sign-in-email']";
  signInPasswordField = "[data-test='sign-in-password']";
  signInButton = "[data-test='sign-in-submit']";

  // Sign in form elements
  signUpTitle = "[data-test='sign-up-title']"
  signUpNameField = "[data-test='sign-up-name']";
  signUpEmailField = "[data-test='sign-up-email']";
  signUpPasswordField = "[data-test='sign-up-password']";
  signUpConfirmPasswordField = "[data-test='sign-up-confirm-password']";
  signUpButton = "[data-test='sign-up-submit']";

  warningNotification = "[data-test='signing-error']";


  fillSignInForm(email, password){
    this.insertField(this.signInEmailField, email);
    this.insertField(this.signInPasswordField, password);
  }

  fillSignUpForm(name, email, password, confirmPassword){
    this.insertField(this.signUpNameField, name);
    this.insertField(this.signUpEmailField, email);
    this.insertField(this.signUpPasswordField, password);
    this.insertField(this.signUpConfirmPasswordField, confirmPassword);
  }

  insertField(element, value){
    cy.get(element).clear().type(value);
  }

  clickSignInButton(){
    cy.get(this.signInButton).should('be.visible').click();
  }

  clickSignUpButton(){
    cy.get(this.signUpButton).should('be.visible').click();
  }

  signIn(email, password){
    this.fillSignInForm(email, password);
    this.clickSignInButton();
  }

  signUp(name, email, password, confirmPassword){
    this.fillSignUpForm(name, email, password, confirmPassword);
    this.clickSignUpButton();
  }
}

export default new SignInPage();
