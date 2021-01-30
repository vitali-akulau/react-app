const { times } = require('lodash');
const BasePage = require('./basepage.page');

class ShopPage extends BasePage {
  get checkoutButton() {
    return $('button=GO TO CHECKOUT');
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

  goToCheckout() {
    this.checkoutButton.click();
  }
}

module.exports = new ShopPage();
