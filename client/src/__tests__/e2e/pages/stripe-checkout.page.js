class StripeCheckoutPage {
  get paymentForm() {
    return $('.Modal-form');
  }

  async getStripeCheckoutFrame() {
    return $('[name="stripe_checkout_app"]');
  }
}

module.exports = new StripeCheckoutPage();
