class BasePage {
  get signOutButton() {
    return $('[data-test="sign-out-button"]');
  }

  open(url) {
    browser.url(url);
  }
}

module.exports = BasePage;
