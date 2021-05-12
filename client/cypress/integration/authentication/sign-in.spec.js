import SignInPage from '../../model/SignInPage';
import validUser from '../../fixtures/users';
import HomePage from '../../model/HomePage';

const SIGN_OUT_LINK_TEXT = 'SIGN OUT';

describe('Sign in page', () => {
  it('User should be able to login with valid credentials', () => {
    cy.visit('/signing');
    SignInPage
      .fillSignInForm(validUser.email, validUser.password)
      .clickSignInButton();

    cy.get(HomePage.signOutLink)
      .should('be.visible')
      .and('contain.text', SIGN_OUT_LINK_TEXT);
  });
});
