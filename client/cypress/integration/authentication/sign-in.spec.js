import SignInPage from '../../model/SignInPage';
import HomePage from '../../model/HomePage';
import user from '../../fixtures/user';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signing');
  });

  describe('Sign In', () => {
    describe('Positive scenarios | User should be able to:', () => {
      it('login with valid credentials', () => {
        SignInPage.signIn(user.email, user.password);

        cy.get(HomePage.signOutLink).should('be.visible');
      });

      it('sign out', () => {
        SignInPage.signIn(user.email, user.password);
        HomePage.clickSignOutLink();

        cy.get(HomePage.signInHeaderLink).should('be.visible');
      });
    });

    describe('Negative scenarios | User should not be able to login use:', () => {
      it('wrong email | empty email | wrong password | empty password | unregistered user', () => {
        cy.fixture('sign-in-users').then((users) => {
          users.forEach((data) => {
            SignInPage.signIn(data.email, data.password);

            cy.url().should('include', '/signing');
            cy.get(SignInPage.signInTitle).should('be.visible');
          });
        });
      });
    });
  });

  describe('Sign Up', () => {
    describe('Positive scenarios | User should be able to:', () => {
      it('sign up use valid credentials', () => {
        SignInPage.signUp(user.name, user.newEmail, user.password, user.confirmPassword);

        cy.get(HomePage.signOutLink).should('be.visible');
      });
    });

    describe('Negative scenarios | User should not be able to sign up with:', () => {
      it('missing name field | missing email field | missing password field | ' +
        'missing confirm password field | mismatching confirm password field | ' +
        'using existing email', () => {
        cy.fixture('sign-up-users').then((users) => {
          users.forEach((data) => {
            SignInPage.signUp(data.name, data.email, data.password, data.confirmPassword);

            cy.url().should('include', '/signing');
            cy.get(SignInPage.signUpTitle).should('be.visible');
          });
        });
      });
    });
  });
});
