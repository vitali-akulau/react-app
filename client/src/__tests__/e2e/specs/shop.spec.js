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

  it('User should be able to add products from "Preview" page', () => {
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
});
