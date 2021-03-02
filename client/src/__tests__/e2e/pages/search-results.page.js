const BasePage = require('./basepage.page');

class SearchResultsPage extends BasePage {
  get emptyResultsContainer() {
    return $('p*=Nothing found');
  }

  getFoundProductById(id) {
    return $(`[data-test=item-container-${id}]`);
  }

  getAllFoundProducts(count) {
    const productCardSelector = '[data-test^=item-container-]';

    browser.waitUntil(() => $$(productCardSelector).length === count);
    return $$(productCardSelector);
  }
}

module.exports = new SearchResultsPage();
