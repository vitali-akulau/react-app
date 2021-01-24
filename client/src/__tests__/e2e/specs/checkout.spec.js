const CheckoutPage = require('../pages/checkout.page');
const ShopPage = require('../pages/shop.page');
const {
  getPreviewProducts,
  getProductsMap,
} = require('../service/data-providers');
const { getCartTotal, getUpdatedProducts } = require('../service/data-handlers');

describe('Checkout', () => {
  afterEach(() => {
    browser.reloadSession();
  });

  it('TA-20: Checkout items count should be equal to number of added products', () => {
    const productsToAddCount = 3;
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, productsToAddCount);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    expect(CheckoutPage.getCheckoutItems()).toHaveLength(productsToAddCount);
  });

  it('TA-21: Cart total should be correct', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);
    const checkoutTotal = getCartTotal(targetProducts);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    expect(CheckoutPage.getCheckoutTotal()).toEqual(checkoutTotal);
  });

  it('TA-22: User is able to increase product quantity', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);
    const [product] = targetProducts;
    const updatedProducts = getUpdatedProducts('increase', targetProducts, product, 1);
    const newCheckoutTotal = getCartTotal(updatedProducts);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.increaseItemCount(product.id, 1);
    expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    browser.pause(10000);
  });

  it('TA-23: User is able to decrease product quantity', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);
    const [product] = targetProducts;
    const updatedProducts = getUpdatedProducts('reduce', targetProducts, product, 1);
    const newCheckoutTotal = getCartTotal(updatedProducts);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.reduceItemCount(product.id, 1);
    expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    browser.pause(10000);
  });

  it('TA-24: User is able to delete product', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);
    const [product] = targetProducts;
    const updatedProducts = getUpdatedProducts('remove', targetProducts, product);
    const newCheckoutTotal = getCartTotal(updatedProducts);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.open('/checkout');
    CheckoutPage.removeItem(product.id);
    expect(CheckoutPage.getCheckoutTotal()).toEqual(newCheckoutTotal);
    browser.pause(10000);
  });
});
