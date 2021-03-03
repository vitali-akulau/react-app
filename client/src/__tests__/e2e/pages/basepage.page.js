const _ = require('lodash');
const { keys } = require('../support/keys');

class BasePage {
  get header() {
    return $('[data-test="header"]');
  }

  get siteLogo() {
    return this.header.$('#site-logo');
  }

  get shopLink() {
    return this.header.$('a=SHOP');
  }

  get contactLink() {
    return this.header.$('a=CONTACT');
  }

  get signInButton() {
    return this.header.$('a=SIGN IN');
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

  get cartItemsCounter() {
    return $('[data-test="cart-items-counter"]');
  }

  get cartEmptyMessage() {
    return $('span=Your cart is empty');
  }

  open(url) {
    browser.url(url);
  }

  openShopPage() {
    this.shopLink.click();
  }

  openContactPage() {
    this.contactLink.click();
  }

  openSigningPage() {
    this.signInButton.click();
  }

  clickOnHeaderLogo() {
    this.siteLogo.click();
  }

  signOut() {
    this.signOutButton.click();
  }

  openCart() {
    this.cartItemsCounter.click();
  }

  getCartProductsCount() {
    return this.cartItemsCounter.getText();
  }

  getCartItem(id) {
    const cartContainer = $(`[data-test=cart-item-${id}]`);

    cartContainer.scrollIntoView();
    return cartContainer;
  }

  getCartItems() {
    return $$('[data-test^=cart-item-]');
  }

  getFooterLinkContainer(name) {
    return this.footer.$(`#${name}-container`);
  }

  getFooterLink(containerName, linkText) {
    return this.getFooterLinkContainer(containerName).$(`a=${linkText}`);
  }

  searchForProduct(query) {
    this.searchBar.setValue(query);
    this.submitWithEnterKey();
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

  switchToFrame(frame) {
    browser.switchToFrame(frame);
  }

  getAlertMessage() {
    return browser.getAlertText();
  }

  submitWithEnterKey() {
    browser.keys(keys.Enter);
  }

  waitForAnimation(element) {
    element.waitForDisplayed();
    browser.waitUntil(() => {
      const oldX = element.getLocation('x');
      const oldY = element.getLocation('y');
      browser.pause(200);
      const newX = element.getLocation('x');
      const newY = element.getLocation('y');
      return oldX === newX && oldY === newY;
    });
  }
}

module.exports = BasePage;
