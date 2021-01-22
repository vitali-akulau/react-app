const {
  flatten, values, sample, map, filter,
} = require('lodash');
const Homepage = require('../pages/homepage.page');
const SearchResultsPage = require('../pages/search-results-page.page');
const getMockedState = require('../../utils/mock-state-provider');

const { shop } = getMockedState(['shop']);
const allProducts = flatten(map(values(shop.collections), 'items'));

describe('Search', () => {
  it('TA-36: User can search for products by exact product name', () => {
    const product = sample(allProducts);

    Homepage.open('/');
    Homepage.searchForProduct(product.name);
    expect(SearchResultsPage.getFoundProductById(product.id)).toBeDisplayed();
  });

  it('TA-36.1: User can search for products by product name substring', () => {
    const product = sample(allProducts);
    const query = sample(product.name.split(' '));
    const expectedProducts = filter(allProducts, (p) => p.name.includes(query));

    Homepage.open('/');
    Homepage.searchForProduct(query);
    expect(SearchResultsPage.getAllFoundProducts(expectedProducts.length))
      .toHaveTextContaining(query);
  });
});
