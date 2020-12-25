import * as cartActions from '../../../../redux/search/search.actions';
import * as searchUtils from '../../../../redux/search/search.utils';
import SearchTypes from '../../../../redux/search/search.types';

describe('Redux: Search Actions', () => {
  const searchQuery = 'reebok';
  const snapshot = {
    portion: '1', of: '2', complex: '3', data: '4',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('"searchProductsStart" should create action to start search', () => {
    expect(cartActions.searchProductsStart(searchQuery))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_START, payload: searchQuery });
  });

  it('"searchProductsSuccess" should create action to successful search', () => {
    expect(cartActions.searchProductsSuccess(snapshot))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_SUCCESS, payload: snapshot });
  });

  it('"searchProductsFailure" should create action to failed search', () => {
    const error = 'error message';

    expect(cartActions.searchProductsFailure(error))
      .toEqual({ type: SearchTypes.SEARCH_PRODUCTS_FAILURE, payload: error });
  });
});
