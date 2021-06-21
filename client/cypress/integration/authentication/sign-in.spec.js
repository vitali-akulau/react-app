import SignInPage from '../../model/SignInPage';
import HomePage from '../../model/HomePage';
import users from '../../fixtures/users.json';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signing');
  });

  describe('Sign In', () => {
    describe('Positive scenarios | User should be able to:', () => {
      it('login with valid credentials', () => {
        SignInPage.signIn(users.validUser[0].email, users.validUser[0].password);

        cy.get(HomePage.signOutLink).should('be.visible');
      });

      it('sign out', () => {
        SignInPage.signIn(users.validUser[0].email, users.validUser[0].password);
        HomePage.clickSignOutLink();

        cy.get(HomePage.signInHeaderLink).should('be.visible');
      });
    });

    describe('Negative scenarios | User should not be able to login use:', () => {
      users.signInInvalidUser.forEach((prop) => {
        it(`${prop.description}`, () => {
          SignInPage.signIn(prop.email, prop.password);

          cy.url().should('include', '/signing');
          cy.get(SignInPage.signInTitle).should('be.visible');
        });
      });
    });
  });

  describe('Sign Up', () => {
    describe('Positive scenarios | User should be able to:', () => {
      it('sign up use valid credentials', () => {
        SignInPage.signUp(users.validUser[0].name,
          `test.user@test${Date.now('YYYY-MM-DDTHH:mm:ss'.replace(':', '-'))}.com`,
          users.validUser[0].password,
          users.validUser[0].confirmPassword);

        cy.get(HomePage.signOutLink).should('be.visible');
      });
    });

    describe('Negative scenarios | User should not be able to sign up with:', () => {
      users.signUpInvalidUser.forEach((prop) => {
        it(`${prop.description}`, () => {
          SignInPage.signUp(prop.name, prop.email, prop.password, prop.confirmPassword);

          cy.url().should('include', '/signing');
          cy.get(SignInPage.signUpTitle).should('be.visible');
        });
      });
    });
  });
});
