const CheckoutPage = require('../pages/checkout.page');
const StripeCheckoutPage = require('../pages/stripe-checkout.page');
const ShopPage = require('../pages/shop.page');
const { getPreviewProducts, getProductsMap } = require('../service/data-providers');

describe('Checkout / Payments', () => {
  beforeEach(() => {
    ShopPage.open('/shop');
  });

  it('TA-25.1: User should be able to proceed to payment', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    expect(StripeCheckoutPage.paymentForm.waitForDisplayed()).toBe(true);
  });
});
