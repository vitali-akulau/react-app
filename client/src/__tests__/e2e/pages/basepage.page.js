const { keys } = require('../support/keys');

class BasePage {
  get signOutButton() {
    return $('[data-test="sign-out-button"]');
  }

  get searchBar() {
    return $('input[name="search"]');
  }

  open(url) {
    browser.url(url);
  }

  searchForProduct(query) {
    this.searchBar.setValue(query);
    browser.keys(keys.Enter);
  }
}

module.exports = BasePage;
