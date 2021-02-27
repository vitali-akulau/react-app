const dayjs = require('dayjs');
const CheckoutPage = require('../pages/checkout.page');
const StripeCheckoutPage = require('../pages/stripe-checkout.page');
const ShopPage = require('../pages/shop.page');
const { errorMessages, notifications } = require('../support/messages');
const { getPreviewProducts, getProductsMap } = require('../service/data-providers');
const { getCartTotal } = require('../service/data-handlers');
const { Address, BillingAddress } = require('../service/seeds/Address');
const User = require('../service/seeds/User');
const PaymentCard = require('../service/seeds/PaymentCard');

describe('Checkout / Payments', () => {
  let userPaymentData;
  const emptyValue = '';
  const previewProducts = getPreviewProducts();
  const targetProducts = getProductsMap(previewProducts, 1);

  beforeEach(() => {
    userPaymentData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard(),
    };

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
  });

  it('TA-25.1: User should be able to proceed to payment', () => {
    expect(StripeCheckoutPage.paymentForm.waitForDisplayed()).toBe(true);
  });

  it('TA-40: User is able to close payment modal', () => {
    StripeCheckoutPage.closePaymentForm();
    StripeCheckoutPage.paymentForm.waitForDisplayed({ reverse: true });
  });

  it('TA-41: Price on payment modal is equal to cart total price', () => {
    const total = getCartTotal(targetProducts);

    const paymentTotal = StripeCheckoutPage.getPaymentFormTotal();
    expect(paymentTotal).toEqual(total);
  });

  it.skip('TA-45: User is able to proceed if they enter valid personal data', () => {
    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.enterCardData(userPaymentData);
    expect(StripeCheckoutPage.getPaymentOperationResultMessage())
      .toBe(notifications.successfulPayment);
  });

  it('TA-57: User is able to step back from the screen with card information', () => {
    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.returnToPersonalForm();
    expect(StripeCheckoutPage.emailField.getValue()).toBe(userPaymentData.email);
  });

  it('TA-44: User unable to proceed if entered invalid email', () => {
    userPaymentData.email = 'asd';

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(userPaymentData.email);
  });

  it('TA-45: User unable to proceed if email is missing', () => {
    userPaymentData.email = emptyValue;

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-46: User unable to proceed if missing name', () => {
    userPaymentData.name = emptyValue;

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-47: User unable to proceed if missing address line1', () => {
    userPaymentData.line1 = emptyValue;

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-48: User unable to proceed if missing address city', () => {
    userPaymentData.city = emptyValue;

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-49: User unable to proceed if missing address zip code', () => {
    userPaymentData.zip = emptyValue;

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-50: User unable to pay if card number is too short', () => {
    userPaymentData.number = new PaymentCard().number.slice(0, 5);

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.enterCardData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('4242 4');
  });

  it('TA-51: User unable to pay if card number is missing', () => {
    userPaymentData.number = emptyValue;

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.enterCardData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-52: User unable to pay with expired card', () => {
    userPaymentData.expDate = dayjs().subtract(1, 'day').format('MMYY');

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.enterCardData(userPaymentData);
    expect(StripeCheckoutPage.getPaymentOperationResultMessage()).toBe(errorMessages.failedPayment);
  });

  it('TA-53: User unable to pay if expiration date is invalid', () => {
    userPaymentData.expDate = 'CARD';

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.enterCardData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-54: User unable to pay if expiration date is missing', () => {
    userPaymentData.expDate = emptyValue;

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.enterCardData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-55: User unable to pay if CVV is invalid', () => {
    userPaymentData.cvv = 'CVV';

    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.enterCardData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it.skip('TA-59: User is able to pay for purchase when billing info differs from shipping one', () => {
    userPaymentData.billingAddress = new BillingAddress();

    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userPaymentData);
    StripeCheckoutPage.enterCardData(userPaymentData);
    expect(StripeCheckoutPage.getPaymentOperationResultMessage())
      .toBe(notifications.successfulPayment);
  });

  it('TA-60: User unable to proceed if missing billing Name', () => {
    userPaymentData.billingAddress = new BillingAddress();
    userPaymentData.billingAddress.name = emptyValue;

    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-61: User unable to proceed if missing billing Street', () => {
    userPaymentData.billingAddress = new BillingAddress();
    userPaymentData.billingAddress.line1 = emptyValue;

    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-62: User unable to proceed if missing billing City', () => {
    userPaymentData.billingAddress = new BillingAddress();
    userPaymentData.billingAddress.city = emptyValue;

    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });

  it('TA-63: User unable to proceed if missing billing Zip Code', () => {
    userPaymentData.billingAddress = new BillingAddress();
    userPaymentData.billingAddress.zip = emptyValue;

    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userPaymentData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(emptyValue);
  });
});
