const CheckoutPage = require('../pages/checkout.page');
const StripeCheckoutPage = require('../pages/stripe-checkout.page');
const ShopPage = require('../pages/shop.page');
const { getPreviewProducts, getProductsMap } = require('../service/data-providers');
const { getCartTotal } = require('../service/data-handlers');

describe('Checkout / Payments', () => {
  beforeEach(() => {
    ShopPage.open('/shop');
  });

  it('TA-25.1: User should be able to proceed to payment', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    expect(StripeCheckoutPage.paymentForm.waitForDisplayed()).toBe(true);
  });

  it('TA-40: User is able to close payment modal', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.closePaymentForm();
    StripeCheckoutPage.paymentForm.waitForDisplayed({ reverse: true });
  });

  it('TA-41: Price on payment modal is equal to cart total price', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const total = getCartTotal(targetProducts);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());

    const paymentTotal = StripeCheckoutPage.getPaymentFormTotal();
    expect(paymentTotal).toEqual(total);
  });
});
