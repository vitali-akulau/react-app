const CheckoutPage = require('../pages/checkout.page');
const StripeCheckoutPage = require('../pages/stripe-checkout.page');
const ShopPage = require('../pages/shop.page');
const {
  getPreviewProducts,
  getProductsMap,
  getTargetProductsCount,
} = require('../service/data-providers');
const { getCartTotal, getUpdatedProducts } = require('../service/data-handlers');

describe('Checkout', () => {
  beforeEach(() => {
    ShopPage.open('/shop');
  });

  afterEach(() => {
    browser.reloadSession();
  });

  it('TA-20: Checkout items count should be equal to number of added products', () => {
    const productsToAddCount = 3;
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, productsToAddCount);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    expect(CheckoutPage.getCheckoutItems()).toHaveLength(productsToAddCount);
  });

  it('TA-24.1: New item rows should not be added if user add same products', () => {
    const productsToAddCount = 3;
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, productsToAddCount);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    expect(CheckoutPage.getCheckoutItems()).toHaveLength(productsToAddCount);
  });

  it('TA-21: Cart total should be correct', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);
    const checkoutTotal = getCartTotal(targetProducts);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    expect(CheckoutPage.getCheckoutTotal()).toEqual(checkoutTotal);
  });

  it('TA-25.1: User should be able to proceed to payment', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.proceedToPayment();
    const iframe = StripeCheckoutPage.stripeCheckoutFrame;
    CheckoutPage.switchToFrame(iframe);
    expect(StripeCheckoutPage.paymentForm.waitForDisplayed()).toBe(true);
  });

  describe('When a user increases items count', () => {
    it('TA-22: then checkout total should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2);
      const [product] = targetProducts;
      const updatedProducts = getUpdatedProducts('increase', targetProducts, product, 1);
      const newCheckoutTotal = getCartTotal(updatedProducts);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.increaseItemCount(product.id, 1);
      expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    });

    it('then checkout item row count should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2);
      const [product] = targetProducts;
      const newProductCount = product.count + 1;

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.increaseItemCount(product.id, 1);
      expect(CheckoutPage.getCheckoutItemCounterCount(product.id)).toEqual(newProductCount);
    });

    it('TA-31: then cart items count should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2);
      const [product] = targetProducts;
      const updatedProducts = getUpdatedProducts('increase', targetProducts, product, 1);
      const newTargetProductsCount = getTargetProductsCount(updatedProducts);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.increaseItemCount(product.id, 1);
      expect(CheckoutPage.getCartProductsCount()).toEqual(newTargetProductsCount);
    });

    it('then cart items should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2);
      const [product] = targetProducts;
      const updatedProducts = getUpdatedProducts('increase', targetProducts, product, 1);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.increaseItemCount(product.id, 1);
      CheckoutPage.openCart();
      updatedProducts.forEach((updatedProduct) => {
        const productTotal = `${updatedProduct.count}x${updatedProduct.price}`;
        expect(CheckoutPage.getCartItem(updatedProduct.id)).toHaveTextContaining(productTotal);
      });
    });
  });

  describe('When a user reduces items count', () => {
    it('TA-23: then checkout total should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2, 2);
      const [product] = targetProducts;
      const updatedProducts = getUpdatedProducts('reduce', targetProducts, product, 1);
      const newCheckoutTotal = getCartTotal(updatedProducts);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.reduceItemCount(product.id, 1);
      expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    });

    it('then checkout item row count should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2, 2);
      const [product] = targetProducts;
      const newProductCount = product.count - 1;

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.reduceItemCount(product.id, 1);
      expect(CheckoutPage.getCheckoutItemCounterCount(product.id)).toEqual(newProductCount);
    });

    it('TA-32: then cart items count should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2, 2);
      const [product] = targetProducts;
      const updatedProducts = getUpdatedProducts('reduce', targetProducts, product, 1);
      const newTargetProductsCount = getTargetProductsCount(updatedProducts);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.reduceItemCount(product.id, 1);
      expect(CheckoutPage.getCartProductsCount()).toEqual(newTargetProductsCount);
    });

    it('then cart items should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2, 2);
      const [product] = targetProducts;
      const updatedProducts = getUpdatedProducts('reduce', targetProducts, product, 1);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.reduceItemCount(product.id, 1);
      CheckoutPage.openCart();
      updatedProducts.forEach((updatedProduct) => {
        const productTotal = `${updatedProduct.count}x${updatedProduct.price}`;
        expect(CheckoutPage.getCartItem(updatedProduct.id)).toHaveTextContaining(productTotal);
      });
    });
  });

  describe('When a user removes items', () => {
    it('then item should be removed from checkout page', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2);
      const [product] = targetProducts;

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.removeItem(product.id);
      expect(CheckoutPage.getCheckoutItem(product.id).waitForDisplayed({ reverse: true }))
        .toBe(true);
    });

    it('TA-24: then checkout total should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2);
      const [product] = targetProducts;
      const updatedProducts = getUpdatedProducts('remove', targetProducts, product);
      const newCheckoutTotal = getCartTotal(updatedProducts);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.removeItem(product.id);
      expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    });

    it('TA-27: then cart items count should be updated', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2);
      const [product] = targetProducts;
      const updatedProducts = getUpdatedProducts('remove', targetProducts, product);
      const newTargetProductsCount = getTargetProductsCount(updatedProducts);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.removeItem(product.id);
      expect(CheckoutPage.getCartProductsCount()).toEqual(newTargetProductsCount);
    });

    it('TA-30: then products should be removed from cart pop-up', () => {
      const previewProducts = getPreviewProducts();
      const targetProducts = getProductsMap(previewProducts, 2);
      const [product] = targetProducts;

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.removeItem(product.id);
      CheckoutPage.openCart();
      expect(CheckoutPage.getCartItems()).toHaveLength(targetProducts.length - 1);
    });
  });
});
