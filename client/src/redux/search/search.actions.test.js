import * as cartActions from './search.actions';
import * as searchUtils from './search.utils';
import SearchTypes from './search.types';

describe('Redux: Search Actions', () => {
  const searchQuery = 'reebok';
  const products = [{ id: 1, name: 'name1' }, { id: 2, name: 'name2' }];
  const snapshot = {
    portion: '1', of: '2', complex: '3', data: '4',
  };
  const getProductsBySearchQueryMock = jest.spyOn(searchUtils, 'getProductsBySearchQuery')
    .mockImplementation(() => (products));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('"searchProductsStart" should create action to start search', () => {
    expect(cartActions.searchProductsStart(searchQuery))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_START, payload: searchQuery });
  });

  it('"searchProductsSuccess" should call data handler', () => {
    cartActions.searchProductsSuccess(snapshot, searchQuery);
    expect(getProductsBySearchQueryMock).toHaveBeenCalledTimes(1);
  });

  it('"searchProductsSuccess" should pass proper data to handler', () => {
    cartActions.searchProductsSuccess(snapshot, searchQuery);
    expect(getProductsBySearchQueryMock).toHaveBeenCalledWith(snapshot, searchQuery);
  });

  it('"searchProductsSuccess" should create action to successful search', () => {
    expect(cartActions.searchProductsSuccess(snapshot, searchQuery))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_SUCCESS, payload: products });
  });

  it('"searchProductsFailure" should create action to failed search', () => {
    const error = 'error message';

    expect(cartActions.searchProductsFailure(error))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_FAILURE, payload: error });
  });
});
