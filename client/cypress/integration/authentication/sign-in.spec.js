import SignInPage from '../../model/SignInPage';
import HomePage from '../../model/HomePage';
import user from '../../fixtures/user';

const SIGN_OUT_LINK_TEXT = 'SIGN OUT';
const SIGN_IN_LINK_TEXT = 'SIGN IN';
const WARNING_TEXT = 'The email address is already in use by another account.';
const HOME_PAGE_URL_PATH = 'http://127.0.0.1:3000/';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signing');
  });
  it('User should be able to login with valid credentials', () => {
    SignInPage
      .fillSignInForm(user.email, user.password)
      .clickSignInButton();

    assertUserLogged();
  });

  it('User should not be able to login use wrong email ', () => {
    SignInPage
      .fillSignInForm(user.wrongEmail, user.password)
      .clickSignInButton();

    assertUserNotLoggedIn();
  });

  it('User should not be able to login use empty email', () => {
    SignInPage
      .fillSignInForm(user.emptyEmail, user.password)
      .clickSignInButton();

    assertUserNotLoggedIn();
  });

  it('User should not be able to login use wrong password', () => {
    SignInPage
      .fillSignInForm(user.email, user.wrongPassword)
      .clickSignInButton();

    assertUserNotLoggedIn();
  });

  it('User should not be able to login use empty password', () => {
    SignInPage
      .fillSignInForm(user.email, user.emptyPassword)
      .clickSignInButton();

    assertUserNotLoggedIn();
  });

  it('User should not be able to login as unregistered user', () => {
    SignInPage
      .fillSignInForm(user.newEmail, user.password)
      .clickSignInButton();

    assertUserNotLoggedIn();
  });

  it('User should be able to sign up use valid credentials', () => {
    SignInPage
      .fillSignUpForm(user.name, user.newEmail, user.password, user.confirmPassword)
      .clickSignUpButton();

    assertUserLogged();
  });

  it('User should not be able to sign up with missing name field', () => {
    SignInPage
      .fillSignUpForm(user.emptyName, user.email, user.password, user.confirmPassword)
      .clickSignUpButton();

    assertUserIsNotAuthorized();
  });

  it('User should not be able to sign up with missing email field', () => {
    SignInPage
      .fillSignUpForm(user.name, user.emptyEmail, user.password, user.confirmPassword)
      .clickSignUpButton();

    assertUserIsNotAuthorized();
  });

  it('User should not be able to sign up with missing password field', () => {
    SignInPage
      .fillSignUpForm(user.name, user.email, user.emptyPassword, user.confirmPassword)
      .clickSignUpButton();

    assertUserIsNotAuthorized();
  });

  it('User should not be able to sign up with missing confirm password field', () => {
    SignInPage
      .fillSignUpForm(user.name, user.email, user.password, user.emptyConfirmPassword)
      .clickSignUpButton();

    assertUserIsNotAuthorized();
  });

  it('User should not be able to sign up with mismatching confirm password field', () => {
    SignInPage
      .fillSignUpForm(user.name, user.email, user.password, user.differentConfirmPassword)
      .clickSignUpButton();

    assertUserIsNotAuthorized();
  });

  it('User should not be able to sign up using existing email', () => {
    SignInPage
      .fillSignUpForm(user.name, user.email, user.password, user.confirmPassword)
      .clickSignUpButton();

    assertUserIsNotAuthorized();
    assertThatWarningNotificationIsDisplay();
  });

  it('User should be able to sign out', () => {
    SignInPage
      .fillSignInForm(user.email, user.password)
      .clickSignInButton();
    HomePage.clickSignOutLink();

    assertUserLoggedOut();
  });

  function assertUserNotLoggedIn() {
    cy.url().should('include', '/signing')
      .get(SignInPage.signInEmailField)
      .should('be.visible')
      .get(SignInPage.signInPasswordField)
      .should('be.visible')
      .get(SignInPage.signInButton)
      .should('be.visible');
  }

  function assertUserIsNotAuthorized() {
    cy.url().should('include', '/signing')
      .get(SignInPage.signUpNameField)
      .should('be.visible')
      .get(SignInPage.signUpEmailField)
      .should('be.visible')
      .get(SignInPage.signUpPasswordField)
      .should('be.visible')
      .get(SignInPage.signUpConfirmPasswordField)
      .should('be.visible');
  }

  function assertUserLogged() {
    cy.url().should('include', HOME_PAGE_URL_PATH)
      .get(HomePage.signOutLink)
      .should('be.visible')
      .and('contain.text', SIGN_OUT_LINK_TEXT);
  }

  function assertUserLoggedOut() {
    cy.url().should('eq', HOME_PAGE_URL_PATH)
      .get(HomePage.signInHeaderLink)
      .should('be.visible')
      .and('contain.text', SIGN_IN_LINK_TEXT);
  }

  function assertThatWarningNotificationIsDisplay() {
    cy.get(SignInPage.warningNotification)
      .should('be.visible')
      .and('contain.text', WARNING_TEXT);
  }
});
