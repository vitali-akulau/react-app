import SignInPage from '../../model/SignInPage';
import validUser from '../../fixtures/users';
import HomePage from '../../model/HomePage';

const SIGN_OUT_LINK_TEXT = 'SIGN OUT';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/signing');
  });

  it('User should be able to login with valid credentials', () => {
    SignInPage.fillSignInForm(validUser.email, validUser.password)
      .clickSignInButton();

    cy.get(HomePage.signOutLink)
      .should('be.visible')
      .and('contain.text', SIGN_OUT_LINK_TEXT);
  });
});
