const { keys } = require('../support/keys');
const _ = require('lodash');

class BasePage {
  get signInButton() {
    return $('[data-test="sign-in-button"]');
  }

  get signOutButton() {
    return $('[data-test="sign-out-button"]');
  }

  get searchBar() {
    return $('input[name="search"]');
  }

  get footer() {
    return $('[data-test="footer"]');
  }

  get signUpFooterLink() {
    return this.footer.$('a=SIGN UP');
  }

  open(url) {
    browser.url(url);
  }

  signOut() {
    this.signOutButton.click();
  }

  searchForProduct(query) {
    this.searchBar.setValue(query);
    browser.keys(keys.Enter);
  }

  switchToWindow(windowGUID) {
    browser.switchToWindow(windowGUID);
  }

  switchToChildWindow(parentWindowGUID) {
    browser.waitUntil(() => browser.getWindowHandles().length === 2);
    const activeWindows = browser.getWindowHandles();
    const [childWindow] = _.without(activeWindows, parentWindowGUID);
    browser.switchToWindow(childWindow);
  }
}

module.exports = BasePage;
