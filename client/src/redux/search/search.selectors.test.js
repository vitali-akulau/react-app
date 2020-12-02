import { selectSearch, selectQueriedProducts, selectIsFetching } from './search.selectors';

describe('Redux: Search Selectors', () => {
  const mockState = {
    search: {
      isFetching: false,
      products: [
        { id: 1, name: 'shoes_1', price: '12' },
        { id: 2, name: 'shoes_2', price: '11' },
      ],
    },
  };

  it('"selectSearch" should return search', () => {
    expect(selectSearch(mockState)).toEqual(mockState.search);
  });

  it('"selectQueriedProducts" should return found products', () => {
    expect(selectQueriedProducts(mockState)).toEqual(mockState.search.products);
  });

  it('"selectIsFetching" should return products fetching status', () => {
    expect(selectIsFetching(mockState)).toEqual(mockState.search.isFetching);
  });
});
