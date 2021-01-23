const getMockedState = require('../../utils/mock-state-provider');
const ShopPage = require('../pages/shop.page');
const { getPreviewProducts, getProductsMap, getTargetProductsCount } = require('../service/data-providers');

const { shop } = getMockedState(['shop']);

describe('Shop', () => {
  it('User should be able to add products from "Preview" page', () => {
    const previewProducts = getPreviewProducts(shop.collections);
    const targetProducts = getProductsMap(previewProducts, 2);
    const targetProductsCount = getTargetProductsCount(targetProducts);

    ShopPage.open('/shop');
    ShopPage.addProductsToCart(targetProducts);
    expect(ShopPage.getCartProductsCount()).toEqual(targetProductsCount);
  });
});
