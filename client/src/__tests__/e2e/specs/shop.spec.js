const getMockedState = require('../../utils/mock-state-provider');
const ShopPage = require('../pages/shop.page');
const {
  getPreviewProducts,
  getProductsMap,
  getTargetProductsCount,
  getRandomCollectionName,
  getOverviewProducts,
  getRandomProduct,
} = require('../service/data-providers');

const { shop } = getMockedState(['shop']);

describe('Shop', () => {
  afterEach(() => {
    browser.reloadSession();
  });

  it('TA-34: Counter shows "0" when cart is empty', () => {
    ShopPage.open('/shop');
    expect(ShopPage.getCartProductsCount()).toEqual('0');
  });

  it('TA-26: User should be able to add products from "Preview" page', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);
    const targetProductsCount = getTargetProductsCount(targetProducts);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    expect(ShopPage.getCartProductsCount()).toEqual(targetProductsCount);
  });

  it('User should be able to add products from "Overview" page', () => {
    const randomCollectionName = getRandomCollectionName(shop.collections);
    const overviewProducts = getOverviewProducts(randomCollectionName);
    const targetProducts = getProductsMap(overviewProducts, 2);
    const targetProductsCount = getTargetProductsCount(targetProducts);

    ShopPage.open(`/shop/${randomCollectionName}`);
    ShopPage.addProductsToCart(targetProducts);
    expect(ShopPage.getCartProductsCount()).toEqual(targetProductsCount);
  });

  it('TA-38: User should be able to add products from "Search" page', () => {
    const product = getRandomProduct();
    const targetProducts = getProductsMap([product], 1);
    const targetProductsCount = getTargetProductsCount(targetProducts);

    ShopPage.open('/shop');
    ShopPage.searchForProduct(product.name);
    ShopPage.addProductsToCart(targetProducts);
    expect(ShopPage.getCartProductsCount()).toEqual(targetProductsCount);
  });

  it('TA-35: Cart items count should be equal to number of added products', () => {
    const productsToAddCount = 3;
    const randomCollectionName = getRandomCollectionName(shop.collections);
    const overviewProducts = getOverviewProducts(randomCollectionName);
    const targetProducts = getProductsMap(overviewProducts, productsToAddCount);

    ShopPage.open(`/shop/${randomCollectionName}`);
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.openCart();
    expect(ShopPage.getCartItems()).toHaveLength(productsToAddCount);
  });

  it('TA-28: Added product name is displayed properly in cart', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.openCart();
    targetProducts.forEach((product) => {
      expect(ShopPage.getCartItem(product.id)).toHaveTextContaining(product.name);
    });
  });

  it('TA-29: Added product total is displayed properly in cart', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.openCart();
    targetProducts.forEach((product) => {
      const productTotal = `${product.count}x${product.price}`;

      expect(ShopPage.getCartItem(product.id)).toHaveTextContaining(productTotal);
    });
  });

  it('TA-35.1: User should be able to proceed to "Checkout"', () => {
    const previewProducts = getPreviewProducts();
    const targetProducts = getProductsMap(previewProducts, 2);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    ShopPage.openCart();
    ShopPage.goToCheckout();
    expect(browser.getUrl()).toContain('/checkout');
  });
});
