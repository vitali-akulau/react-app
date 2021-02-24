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

  it.skip('TA-45: User is able to proceed if they enter valid personal data', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.enterCardData(userData);
    expect(StripeCheckoutPage.getPaymentOperationResultMessage())
      .toBe(notifications.successfulPayment);
  });

  it('TA-57: User is able to step back from the screen with card information', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.returnToPersonalForm();
    expect(StripeCheckoutPage.emailField.getValue()).toBe(userData.email);
  });

  it('TA-44: User unable to proceed if entered invalid email', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User({ email: 'asd' }),
      ...new PaymentCard(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe(userData.email);
  });

  it('TA-45: User unable to proceed if email is missing', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User({ email: ' ' }),
      ...new PaymentCard(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-46: User unable to proceed if missing name', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const user = new User();
    user.name = '';
    const userData = {
      ...new Address(),
      ...user,
      ...new PaymentCard(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-47: User unable to proceed if missing address line1', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const address = new Address();
    address.line1 = '';
    const userData = {
      ...address,
      ...new User(),
      ...new PaymentCard(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-48: User unable to proceed if missing address city', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const address = new Address();
    address.city = '';
    const userData = {
      ...address,
      ...new User(),
      ...new PaymentCard(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-49: User unable to proceed if missing address zip code', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const address = new Address();
    address.zip = '';
    const userData = {
      ...address,
      ...new User(),
      ...new PaymentCard(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-50: User unable to pay if card number is too short', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard({ number: new PaymentCard().number.slice(0, 5) }),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.enterCardData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('4242 4');
  });

  it('TA-51: User unable to pay if card number is missing', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard({ number: ' ' }),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.enterCardData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-52: User unable to pay with expired card', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const expDate = dayjs().subtract(1, 'day').format('MMYY');
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard({ expDate }),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.enterCardData(userData);
    expect(StripeCheckoutPage.getPaymentOperationResultMessage()).toBe(errorMessages.failedPayment);
  });

  it('TA-53: User unable to pay if expiration date is invalid', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard({ expDate: 'CARD' }),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.enterCardData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-54: User unable to pay if expiration date is missing', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard({ expDate: ' ' }),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.enterCardData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-55: User unable to pay if CVV is invalid', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard({ cvv: 'CVV' }),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.enterCardData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it.skip('TA-59: User is able to pay for purchase when billing info differs from shipping one', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard(),
      billingAddress: new BillingAddress(),
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userData);
    StripeCheckoutPage.enterCardData(userData);
    expect(StripeCheckoutPage.getPaymentOperationResultMessage())
      .toBe(notifications.successfulPayment);
  });

  it('TA-60: User unable to proceed if missing billing Name', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const billingAddress = new BillingAddress();
    billingAddress.name = '';
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard(),
      billingAddress,
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-61: User unable to proceed if missing billing Street', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const billingAddress = new BillingAddress();
    billingAddress.line1 = '';
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard(),
      billingAddress,
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-62: User unable to proceed if missing billing City', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const billingAddress = new BillingAddress();
    billingAddress.city = '';
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard(),
      billingAddress,
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });

  it('TA-63: User unable to proceed if missing billing Zip Code', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 1);
    const billingAddress = new BillingAddress();
    billingAddress.zip = '';
    const userData = {
      ...new Address(),
      ...new User(),
      ...new PaymentCard(),
      billingAddress,
    };

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    CheckoutPage.switchToFrame(StripeCheckoutPage.getStripeCheckoutFrame());
    StripeCheckoutPage.toggleAddressesCheckbox();
    StripeCheckoutPage.enterPersonalData(userData);
    expect(StripeCheckoutPage.getInvalidInputValue()).toBe('');
  });
});
