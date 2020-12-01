import * as cartActions from './search.actions';
import SearchTypes from './search.types';

describe('Redux: Search Actions', () => {
  it('"searchProductsStart" should create action to start search', () => {
    const searchQuery = 'reebok';

    expect(cartActions.searchProductsStart(searchQuery))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_START, payload: searchQuery });
  });

  it('"searchProductsSuccess" should create action to successful search', () => {
    const products = [{ id: 1, name: 'name1' }, { id: 2, name: 'name2' }];

    expect(cartActions.searchProductsSuccess(products))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_SUCCESS, payload: products });
  });

  it('"searchProductsFailure" should create action to failed search', () => {
    const error = 'error message';

    expect(cartActions.searchProductsFailure(error))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_FAILURE, payload: error });
  });
});
