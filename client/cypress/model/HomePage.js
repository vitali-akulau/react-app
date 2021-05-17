class HomePage {
  signOutLink = "[data-test='sign-out-button']";
  signInHeaderLink = "[data-test='header'] a[href*='/signing']";


  clickSignOutLink(){
    cy.get(this.signOutLink).click();
  }
}

export default new HomePage();
