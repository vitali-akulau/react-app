import SignInPage from '../../model/SignInPage';
import HomePage from '../../model/HomePage';
import user from '../../fixtures/user';
import userData from '../../data/userData';

const SIGN_OUT_LINK_TEXT = 'SIGN OUT';
const SIGN_IN_LINK_TEXT = 'SIGN IN';
const WARNING_TEXT = 'The email address is already in use by another account.';
const URL_PATH = 'http://127.0.0.1:3000/';
let currentUser;

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signing');
  });

  it('User should be able to login with valid credentials', () => {
    currentUser = user.createUser(
      userData.name, userData.existEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignInForm(currentUser.email, currentUser.password)
      .clickSignInButton();

    cy.get(HomePage.signOutLink)
      .should('be.visible')
      .and('contain.text', SIGN_OUT_LINK_TEXT);
  });

  it.skip('User should not be able to login use wrong email ', () => {
    currentUser = user.createUser(
      userData.name, userData.wrongEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignInForm(currentUser.email, currentUser.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should not be able to login use empty email', () => {
    currentUser = user.createUser(
      userData.name, userData.emptyEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignInForm(currentUser.email, currentUser.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should not be able to login use wrong password', () => {
    currentUser = user.createUser(
      userData.name, userData.emptyEmail, userData.wrongPassword, userData.confirmPassword,
    );

    SignInPage
      .fillSignInForm(currentUser.email, currentUser.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should not be able to login use empty password', () => {
    currentUser = user.createUser(
      userData.name, userData.emptyEmail, userData.emptyPassword, userData.confirmPassword,
    );

    SignInPage
      .fillSignInForm(currentUser.email, currentUser.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should not be able to login as unregistered userData', () => {
    currentUser = user.createUser(
      userData.name, userData.emptyEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignInForm(currentUser.unregisteredEmail, currentUser.password)
      .clickSignInButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signInButton)
      .should('be.visible');
  });

  it.skip('User should be able to sign up use valid credentials', () => {
    currentUser = user.createUser(
      userData.name, userData.newEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignUpForm(currentUser.name, currentUser.email, currentUser.password,
        currentUser.confirmPassword)
      .clickSignUpButton();

    cy.get(HomePage.signOutLink)
      .should('be.visible')
      .and('contain.text', SIGN_OUT_LINK_TEXT);
  });

  it.skip('User should not be able to sign up with missing name field', () => {
    currentUser = user.createUser(
      userData.emptyName, userData.existEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignUpForm(currentUser.emptyName, currentUser.email, currentUser.password,
        currentUser.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up with missing email field', () => {
    currentUser = user.createUser(
      userData.name, userData.emptyEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignUpForm(currentUser.name, currentUser.email, currentUser.password,
        currentUser.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up with missing password field', () => {
    currentUser = user.createUser(
      userData.name, userData.newEmail, userData.emptyPassword, userData.confirmPassword,
    );

    SignInPage
      .fillSignUpForm(currentUser.name, currentUser.email, currentUser.password,
        currentUser.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up with missing confirm password field', () => {
    currentUser = user.createUser(
      userData.name, userData.newEmail, userData.password, userData.emptyConfirmPassword,
    );

    SignInPage
      .fillSignUpForm(currentUser.name, currentUser.email, currentUser.password,
        currentUser.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up with mismatching confirm password field', () => {
    currentUser = user.createUser(
      userData.name, userData.newEmail, userData.password, userData.differentConfirmPassword,
    );

    SignInPage
      .fillSignUpForm(currentUser.name, currentUser.email, currentUser.password,
        currentUser.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible');
  });

  it.skip('User should not be able to sign up using existing email', () => {
    currentUser = user.createUser(
      userData.name, userData.existEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignUpForm(currentUser.name, currentUser.email, currentUser.password,
        currentUser.confirmPassword)
      .clickSignUpButton();

    cy.url().should('include', '/signing')
      .get(SignInPage.signUpButton)
      .should('be.visible')
      .get(SignInPage.warningNotification)
      .should('be.visible')
      .and('contain.text', WARNING_TEXT);
  });

  it.skip('User should be able to sign out', () => {
    currentUser = user.createUser(
      userData.name, userData.existEmail, userData.password, userData.confirmPassword,
    );

    SignInPage
      .fillSignInForm(currentUser.email, currentUser.password)
      .clickSignInButton();
    HomePage.clickSignOutLink();

    cy.url().should('eq', URL_PATH)
      .get(HomePage.signInHeaderLink)
      .should('be.visible')
      .and('contain.text', SIGN_IN_LINK_TEXT);
  });
});
