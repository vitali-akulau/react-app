class StripeCheckoutPage {
  get stripeCheckoutFrame() {
    return $('[name="stripe_checkout_app"]');
  }

  get paymentForm() {
    return $('.Modal-form');
  }
}

module.exports = new StripeCheckoutPage();
