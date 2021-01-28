class StripeCheckoutPage {
  get paymentForm() {
    return $('.Modal-form');
  }

  getStripeCheckoutFrame() {
    return $('[name="stripe_checkout_app"]');
  }
}

module.exports = new StripeCheckoutPage();
