import SignInPage from '../../model/SignInPage';
import HomePage from '../../model/HomePage';
import users from '../../fixtures/users.json';

const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signing');
  });

  describe('Sign In', () => {
    describe('Positive scenarios | User should be able to:', () => {
      it('login with valid credentials', () => {
        SignInPage.signIn(users.email, users.password);

        cy.get(HomePage.signOutLink).should('be.visible');
      });

      it('sign out', () => {
        SignInPage.signIn(users.email, users.password);
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
        SignInPage.signUp(users.name, setEmail(users.email), users.password, users.confirmPassword);

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

const setEmail = (emailAddress) => (
  `${emailAddress}${Date.now(DATE_FORMAT.replace(':', '-'))}.com`
);
