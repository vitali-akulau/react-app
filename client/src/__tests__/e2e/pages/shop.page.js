const { times } = require('lodash');
const BasePage = require('./basepage.page');

class ShopPage extends BasePage {
  get cartItemsCounter() {
    return $('[data-test="cart-items-counter"]');
  }

  getProductCardById(id) {
    const productCard = $(`[data-test=item-container-${id}]`);

    productCard.scrollIntoView();
    return productCard;
  }

  addProductsToCart(products) {
    products.forEach((product) => {
      const { id, count } = product;
      this.getProductCardById(id).moveTo();
      times(count, () => {
        this.getProductCardById(id).$('button=Add to Cart').click();
      });
    });
  }

  getCartProductsCount() {
    return this.cartItemsCounter.getText();
  }
}

module.exports = new ShopPage();
