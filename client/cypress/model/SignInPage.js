import signing from '../waiters/waiters';

class SignInPage {
  // Sign in form elements
  signInEmailField = "[data-test='sign-in-email']";
  signInPasswordField = "[data-test='sign-in-password']";
  signInButton = "[data-test='sign-in-submit']";

  // Sign in form elements
  signUpNameField = "[data-test='sign-up-name']";
  signUpEmailField = "[data-test='sign-up-email']";
  signUpPasswordField = "[data-test='sign-up-password']";
  signUpConfirmPasswordField = "[data-test='sign-up-confirm-password']";
  signUpButton = "[data-test='sign-up-submit']";

  warningNotification = "[data-test='signing-error']";


  fillSignInForm(email, password){
    this.insertField(this.signInEmailField, email);
    this.insertField(this.signInPasswordField, password);
    return this;
  }

  fillSignUpForm(name, email, password, confirmPassword){
    this.insertField(this.signUpNameField, name);
    this.insertField(this.signUpEmailField, email);
    this.insertField(this.signUpPasswordField, password);
    this.insertField(this.signUpConfirmPasswordField, confirmPassword);
    return this;
  }

  insertField(element, value){
    cy.get(element)
      .clear().then(e => {
        if (value !== '')
          cy.wrap(e).type(value)
      });
  }

  clickSignInButton(){
    cy.get(this.signInButton).click();
  }

  clickSignUpButton(){
    cy.get(this.signUpButton).click();
    cy.wait('@getSigning');
  }
}

export default new SignInPage();
