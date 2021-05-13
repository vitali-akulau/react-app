import SignInPage from '../../model/SignInPage';
import {
  validUser,
  userWithWrongEmail,
  userWithEmptyEmail,
  userWithWrongPassword,
  userWithEmptyPassword,
  unRegisteredUser,
  testUser,
  userWithEmptyName,
  userWithEmptyConfirmPassword, userWithMismatchingConfirmPassword,
} from '../../fixtures/users';
import HomePage from '../../model/HomePage';

const SIGN_OUT_LINK_TEXT = 'SIGN OUT';
const SIGN_IN_LINK_TEXT = 'SIGN IN';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signing');
  });

  it('User should be able to login with valid credentials', () => {
    SignInPage
      .fillSignInForm(validUser.email, validUser.password)
      .clickSignInButton();

    cy.get(HomePage.signOutLink)
      .should('be.visible')
      .and('contain.text', SIGN_OUT_LINK_TEXT);
  });

  it.skip('User should not be able to login use wrong email ', () => {
    SignInPage
      .fillSignInForm(userWithWrongEmail.email, userWithWrongEmail.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should not be able to login use empty email', () => {
    SignInPage
      .fillSignInForm(userWithEmptyEmail.email, userWithEmptyEmail.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should not be able to login use wrong password', () => {
    SignInPage
      .fillSignInForm(userWithWrongPassword.email, userWithWrongPassword.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should not be able to login use empty password', () => {
    SignInPage
      .fillSignInForm(userWithEmptyPassword.email, userWithEmptyPassword.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should not be able to login as unregistered user', () => {
    SignInPage
      .fillSignInForm(unRegisteredUser.email, unRegisteredUser.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should be able to sign up use valid credentials', () => {
    SignInPage
      .fillSignUpForm(testUser.name, testUser.email, testUser.password, testUser.confirmPassword)
      .clickSignUpButton();

    cy.get(HomePage.signOutLink)
      .should('be.visible')
      .and('contain.text', SIGN_OUT_LINK_TEXT);
  });

  it.skip('User should not be able to sign up with missing name field', () => {
    SignInPage
      .fillSignUpForm(userWithEmptyName.name, userWithEmptyName.email, userWithEmptyName.password,
        userWithEmptyName.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up with missing email field', () => {
    SignInPage
      .fillSignUpForm(userWithEmptyEmail.name, userWithEmptyEmail.email,
        userWithEmptyEmail.password, userWithEmptyEmail.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up with missing password field', () => {
    SignInPage
      .fillSignUpForm(userWithEmptyPassword.name, userWithEmptyPassword.email,
        userWithEmptyPassword.password, userWithEmptyPassword.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up with missing confirm password field', () => {
    SignInPage
      .fillSignUpForm(userWithEmptyConfirmPassword.name, userWithEmptyConfirmPassword.email,
        userWithEmptyConfirmPassword.password, userWithEmptyConfirmPassword.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up with mismatching confirm password field', () => {
    SignInPage
      .fillSignUpForm(userWithMismatchingConfirmPassword.name,
        userWithMismatchingConfirmPassword.email,
        userWithMismatchingConfirmPassword.password,
        userWithMismatchingConfirmPassword.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up using existing email', () => {
    SignInPage
      .fillSignUpForm(validUser.name, validUser.email, validUser.password,
        validUser.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible')
      .get(SignInPage.warningNotification)
      .should('be.visible')
      .and('contain.text', 'The email address is already in use by another account.');
  });

  it.skip('User should be able to sign out', () => {
    SignInPage
      .fillSignInForm(validUser.email, validUser.password)
      .clickSignInButton();
    HomePage.clickSignOutLink();

    cy.url().should('eq', 'http://127.0.0.1:3000/')
      .get(HomePage.signInHeaderLink)
      .should('be.visible')
      .and('contain.text', SIGN_IN_LINK_TEXT);
  });
});
