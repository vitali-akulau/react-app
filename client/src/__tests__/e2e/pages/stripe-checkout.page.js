const BasePage = require('./basepage.page');

class StripeCheckoutPage extends BasePage {
  get paymentForm() {
    return $('.Modal-form');
  }

  get closePaymentFormButton() {
    return $('.Header-navClose');
  }

  get purchaseDescriptionHeader() {
    return $('.Header-purchaseDescription');
  }

  getStripeCheckoutFrame() {
    const iframe = $('[name="stripe_checkout_app"]');
    iframe.waitForDisplayed();
    return iframe;
  }

  closePaymentForm() {
    this.closePaymentFormButton.waitForDisplayed();
    this.closePaymentFormButton.click();
  }

  getPaymentFormTotal() {
    this.purchaseDescriptionHeader.waitForDisplayed();
    const headerText = this.purchaseDescriptionHeader.getText();
    return Number.parseInt(headerText.match(/\d+/)[0], 10);
  }
}

module.exports = new StripeCheckoutPage();
