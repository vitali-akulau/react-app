const CheckoutPage = require('../pages/checkout.page');
const ShopPage = require('../pages/shop.page');
const { getCollectionProducts, getRandomCollection } = require('../service/data-providers');
const {
  getCartTotal,
  getUpdatedProducts,
  getProductsMap,
  getTargetProductsCount,
} = require('../service/data-handlers');

describe('Checkout / Items', () => {
  let targetProducts;
  let product;
  let updatedProducts;
  const productsToAddCount = 3;
  const collection = getRandomCollection();
  const previewProducts = getCollectionProducts(collection, true);

  beforeEach(() => {
    targetProducts = getProductsMap(previewProducts, productsToAddCount);

    ShopPage.open('/shop');
  });

  it('TA-20: Checkout items count should be equal to number of added products', () => {
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    expect(CheckoutPage.getCheckoutItems()).toHaveLength(productsToAddCount);
  });

  it('TA-24.1: New item rows should not be added if user add same products', () => {
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    expect(CheckoutPage.getCheckoutItems()).toHaveLength(productsToAddCount);
  });

  it('TA-21: Cart total should be correct', () => {
    const checkoutTotal = getCartTotal(targetProducts);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    expect(CheckoutPage.getCheckoutTotal()).toEqual(checkoutTotal);
  });

  describe('When a user increases items count', () => {
    beforeEach(() => {
      targetProducts = getProductsMap(previewProducts, productsToAddCount);
      [product] = targetProducts;
      updatedProducts = getUpdatedProducts('increase', targetProducts, product, 1);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.increaseItemCount(product.id, 1);
    });

    it('TA-22: then checkout total should be updated', () => {
      const newCheckoutTotal = getCartTotal(updatedProducts);

      expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    });

    it('then checkout item row count should be updated', () => {
      const newProductCount = product.count + 1;

      expect(CheckoutPage.getCheckoutItemCounterCount(product.id)).toEqual(newProductCount);
    });

    it('TA-31: then cart items count should be updated', () => {
      const newTargetProductsCount = getTargetProductsCount(updatedProducts);

      expect(CheckoutPage.getCartProductsCount()).toEqual(newTargetProductsCount);
    });

    it('then cart items should be updated', () => {
      CheckoutPage.openCart();
      updatedProducts.forEach((updatedProduct) => {
        const productTotal = `${updatedProduct.count}x${updatedProduct.price}`;
        expect(CheckoutPage.getCartItem(updatedProduct.id)).toHaveTextContaining(productTotal);
      });
    });
  });

  describe('When a user reduces items count', () => {
    beforeEach(() => {
      targetProducts = getProductsMap(previewProducts, productsToAddCount, 2);
      [product] = targetProducts;
      updatedProducts = getUpdatedProducts('reduce', targetProducts, product, 1);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.reduceItemCount(product.id, 1);
    });

    it('TA-23: then checkout total should be updated', () => {
      const newCheckoutTotal = getCartTotal(updatedProducts);

      expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    });

    it('then checkout item row count should be updated', () => {
      const newProductCount = product.count - 1;

      expect(CheckoutPage.getCheckoutItemCounterCount(product.id)).toEqual(newProductCount);
    });

    it('TA-32: then cart items count should be updated', () => {
      const newTargetProductsCount = getTargetProductsCount(updatedProducts);

      expect(CheckoutPage.getCartProductsCount()).toEqual(newTargetProductsCount);
    });

    it('then cart items should be updated', () => {
      CheckoutPage.openCart();
      updatedProducts.forEach((updatedProduct) => {
        const productTotal = `${updatedProduct.count}x${updatedProduct.price}`;
        expect(CheckoutPage.getCartItem(updatedProduct.id)).toHaveTextContaining(productTotal);
      });
    });
  });

  describe('When a user removes items', () => {
    beforeEach(() => {
      targetProducts = getProductsMap(previewProducts, productsToAddCount);
      [product] = targetProducts;
      updatedProducts = getUpdatedProducts('remove', targetProducts, product);

      ShopPage.addProductsToCart(targetProducts);
      ShopPage.open('/checkout');
      CheckoutPage.removeItem(product.id, 1);
    });

    it('then item should be removed from checkout page', () => {
      expect(CheckoutPage.getCheckoutItem(product.id).waitForDisplayed({ reverse: true }))
        .toBe(true);
    });

    it('TA-24: then checkout total should be updated', () => {
      const newCheckoutTotal = getCartTotal(updatedProducts);

      expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    });

    it('TA-27: then cart items count should be updated', () => {
      const newTargetProductsCount = getTargetProductsCount(updatedProducts);

      expect(CheckoutPage.getCartProductsCount()).toEqual(newTargetProductsCount);
    });

    it('TA-30: then products should be removed from cart pop-up', () => {
      CheckoutPage.openCart();
      expect(CheckoutPage.getCartItems()).toHaveLength(targetProducts.length - 1);
    });
  });
});
