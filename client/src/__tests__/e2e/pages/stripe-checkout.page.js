class StripeCheckoutPage {
  get paymentForm() {
    return $('.Modal-form');
  }

  getStripeCheckoutFrame() {
    const iframe = $('[name="stripe_checkout_app"]');
    iframe.waitForDisplayed();
    return iframe;
  }
}

module.exports = new StripeCheckoutPage();
