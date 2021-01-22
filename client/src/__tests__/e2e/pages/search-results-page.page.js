const Basepage = require('./basepage.page');

class SearchResultsPage extends Basepage {
  getFoundProductById(id) {
    return $(`[data-test=item-container-${id}]`);
  }

  waitFoundProducts(count) {
    browser.waitUntil(() => $$('[data-test^=item-container-]').length === count);
  }

  getAllFoundProducts(count) {
    this.waitFoundProducts(count);
    return $$('[data-test^=item-container-]');
  }
}

module.exports = new SearchResultsPage();
