const ShopPage = require('../pages/shop.page');
const {
  getCollectionProducts,
  getProductsMap,
  getTargetProductsCount,
  getRandomCollection,
  getRandomProduct,
} = require('../service/data-providers');

describe('Shop', () => {
  const productsToAddCount = 2;
  const randomCollection = getRandomCollection();
  const previewProducts = getCollectionProducts(randomCollection, true);
  const previewTargetProducts = getProductsMap(previewProducts, productsToAddCount);

  beforeEach(() => {
    ShopPage.open('/shop');
  });

  it('TA-34: Counter shows "0" when cart is empty', () => {
    expect(ShopPage.getCartProductsCount()).toEqual('0');
  });

  it('TA-33: Empty state is shown on cart pop-up when cart is empty', () => {
    ShopPage.openCart();
    expect(ShopPage.cartEmptyMessage.waitForDisplayed()).toBe(true);
  });

  it('TA-26: User should be able to add products from "Preview" page', () => {
    const targetProductsCount = getTargetProductsCount(previewTargetProducts);

    ShopPage.addProductsToCart(previewTargetProducts);
    expect(ShopPage.getCartProductsCount()).toEqual(targetProductsCount);
  });

  it('User should be able to add products from "Overview" page', () => {
    const overviewProducts = getCollectionProducts(randomCollection);
    const targetProducts = getProductsMap(overviewProducts, productsToAddCount);
    const targetProductsCount = getTargetProductsCount(targetProducts);

    ShopPage.open(`/shop/${randomCollection.routeName}`);
    ShopPage.addProductsToCart(targetProducts);
    expect(ShopPage.getCartProductsCount()).toEqual(targetProductsCount);
  });

  it('TA-38: User should be able to add products from "Search" page', () => {
    const product = getRandomProduct();
    const targetProducts = getProductsMap([product], 1);
    const targetProductsCount = getTargetProductsCount(targetProducts);

    ShopPage.searchForProduct(product.name);
    ShopPage.addProductsToCart(targetProducts);
    expect(ShopPage.getCartProductsCount()).toEqual(targetProductsCount);
  });

  it('TA-35: Cart items count should be equal to number of added products', () => {
    ShopPage.addProductsToCart(previewTargetProducts);
    ShopPage.openCart();
    expect(ShopPage.getCartItems()).toHaveLength(productsToAddCount);
  });

  it('TA-28: Added product name is displayed properly in cart', () => {
    ShopPage.addProductsToCart(previewTargetProducts);
    ShopPage.openCart();
    previewTargetProducts.forEach((product) => {
      expect(ShopPage.getCartItem(product.id)).toHaveTextContaining(product.name);
    });
  });

  it('TA-29: Added product total is displayed properly in cart', () => {
    ShopPage.addProductsToCart(previewTargetProducts);
    ShopPage.openCart();
    previewTargetProducts.forEach((product) => {
      const productTotal = `${product.count}x${product.price}`;

      expect(ShopPage.getCartItem(product.id)).toHaveTextContaining(productTotal);
    });
  });

  it('TA-35.1: User should be able to proceed to "Checkout"', () => {
    const targetProducts = getProductsMap(previewProducts, productsToAddCount);

    ShopPage.addProductsToCart(targetProducts);
    ShopPage.openCart();
    ShopPage.goToCheckout();
    expect(browser.getUrl()).toContain('/checkout');
  });
});
