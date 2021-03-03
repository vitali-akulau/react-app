const { times } = require('lodash');
const BasePage = require('./basepage.page');

class ShopPage extends BasePage {
  get checkoutButton() {
    return $('button=GO TO CHECKOUT');
  }

  getProductCardById(id) {
    const productCard = $(`[data-test=item-container-${id}]`);

    productCard.waitForExist();
    productCard.scrollIntoView();
    return productCard;
  }

  getAddToCartButton(id) {
    return this.getProductCardById(id).$('button=Add to Cart');
  }

  addProductsToCart(products) {
    products.forEach((product) => {
      const { id, count } = product;

      this.getProductCardById(id).moveTo();
      times(count, () => {
        this.getAddToCartButton(id).moveTo();
        this.getAddToCartButton(id).click();
      });
    });
  }

  goToCheckout() {
    this.checkoutButton.click();
  }
}

module.exports = new ShopPage();
