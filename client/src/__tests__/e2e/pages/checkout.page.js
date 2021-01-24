const { times } = require('lodash');
const BasePage = require('./basepage.page');

class CheckoutPage extends BasePage {
  get total() {
    return $('[data-test=checkout-total]');
  }

  getCheckoutItem(id) {
    return $(`[data-test=checkout-item-${id}]`);
  }

  getCheckoutItemIncreaseCountButton(id) {
    return this.getCheckoutItem(id).$('[data-test=item-increase-count]');
  }

  getCheckoutItemReduceCountButton(id) {
    return this.getCheckoutItem(id).$('[data-test=item-reduce-count]');
  }

  getCheckoutItemRemoveButton(id) {
    return this.getCheckoutItem(id).$('[data-test=item-remove]');
  }

  getCheckoutItems() {
    return $$('[data-test^=checkout-item]');
  }

  getCheckoutTotal() {
    return Number.parseInt(this.total.getText().match(/\d+/)[0], 10);
  }

  increaseItemCount(id, count) {
    times(count, () => {
      this.getCheckoutItemIncreaseCountButton(id).click();
    });
  }

  reduceItemCount(id, count) {
    times(count, () => {
      this.getCheckoutItemReduceCountButton(id).click();
    });
  }

  removeItem(id) {
    this.getCheckoutItemRemoveButton(id).click();
  }
}

module.exports = new CheckoutPage();
