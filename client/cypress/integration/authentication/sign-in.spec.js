import SignInPage from '../../model/SignInPage';
import HomePage from '../../model/HomePage';
import user from '../../fixtures/user';
import constants from '../../fixtures/constants';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signing');
  });

  describe('Sign In', () => {
    it('User should be able to login with valid credentials', () => {
      SignInPage.signIn(user.email, user.password);

      assertUserLogged();
    });

    it('User should be able to sign out', () => {
      SignInPage.signIn(user.email, user.password);
      HomePage.clickSignOutLink();

      assertUserLoggedOut();
    });

    it('User should not be able to login use wrong email ', () => {
      SignInPage.signIn(user.wrongEmail, user.password);

      assertUserNotLoggedIn();
    });

    it('User should not be able to login use empty email', () => {
      SignInPage.signIn(user.emptyEmail, user.password);

      assertUserNotLoggedIn();
    });

    it('User should not be able to login use wrong password', () => {
      SignInPage.signIn(user.email, user.wrongPassword);

      assertUserNotLoggedIn();
    });

    it('User should not be able to login use empty password', () => {
      SignInPage.signIn(user.email, user.emptyPassword);

      assertUserNotLoggedIn();
    });

    it('User should not be able to login as unregistered user', () => {
      SignInPage.signIn(user.newEmail, user.password);

      assertUserNotLoggedIn();
    });
  });

  describe('Sign Up', () => {
    it('User should be able to sign up use valid credentials', () => {
      SignInPage.signUp(user.name, user.newEmail, user.password, user.confirmPassword);

      assertUserLogged();
    });

    it('User should not be able to sign up with missing name field', () => {
      SignInPage.signUp(user.emptyName, user.email, user.password, user.confirmPassword);

      assertUserIsNotAuthorized();
    });

    it('User should not be able to sign up with missing email field', () => {
      SignInPage.signUp(user.name, user.emptyEmail, user.password, user.confirmPassword);

      assertUserIsNotAuthorized();
    });

    it('User should not be able to sign up with missing password field', () => {
      SignInPage.signUp(user.name, user.email, user.emptyPassword, user.confirmPassword);

      assertUserIsNotAuthorized();
    });

    it('User should not be able to sign up with missing confirm password field', () => {
      SignInPage.signUp(user.name, user.email, user.password, user.emptyConfirmPassword);

      assertUserIsNotAuthorized();
    });

    it('User should not be able to sign up with mismatching confirm password field', () => {
      SignInPage.signUp(user.name, user.email, user.password, user.differentConfirmPassword);

      assertUserIsNotAuthorized();
    });

    it('User should not be able to sign up using existing email', () => {
      SignInPage.signUp(user.name, user.email, user.password, user.confirmPassword);

      assertUserIsNotAuthorized();
      assertThatWarningNotificationIsDisplay();
    });
  });

  function assertUserNotLoggedIn() {
    cy.url().should('include', '/signing');
    cy.get(SignInPage.signInTitle).should('be.visible');
  }

  function assertUserIsNotAuthorized() {
    cy.url().should('include', '/signing');
    cy.get(SignInPage.signUpTitle).should('be.visible');
  }

  function assertUserLogged() {
    cy.url().should('include', constants.homePageUrlPath);
  }

  function assertUserLoggedOut() {
    cy.get(HomePage.signInHeaderLink).should('be.visible');
  }

  function assertThatWarningNotificationIsDisplay() {
    cy.get(SignInPage.warningNotification).should('be.visible');
  }
});
