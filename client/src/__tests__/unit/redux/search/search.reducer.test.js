import searchReducer from '../../../../redux/search/search.reducer';
import SearchTypes from '../../../../redux/search/search.types';
import * as searchUtils from '../../../../redux/search/search.utils';

describe('Redux: Search Reducer', () => {
  const initialState = {
    query: null,
    products: null,
    isFetching: false,
    errorMessage: undefined,
  };
  const query = 'product';

  it('should return initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state if unrecognized action provided', () => {
    const unrecognizedAction = { type: 'DO_SOMETHING', payload: 'payload' };

    expect(searchReducer(undefined, unrecognizedAction)).toEqual(initialState);
  });

  describe('SEARCH_PRODUCTS_START', () => {
    const state = { ...initialState };

    it('should add search query to state', () => {
      expect(searchReducer(state, {
        type: SearchTypes.SEARCH_PRODUCTS_START,
        payload: query,
      }))
        .toContainEntry(['query', query]);
    });

    it('should reflect start of fetching procedure', () => {
      expect(searchReducer(state, {
        type: SearchTypes.SEARCH_PRODUCTS_START,
        payload: query,
      }))
        .toContainEntry(['isFetching', true]);
    });
  });

  describe('SEARCH_PRODUCTS_SUCCESS', () => {
    const state = { ...initialState, query, isFetching: true };
    const searchResults = [{ name: 'product1' }, { name: 'product2' }];
    const snapshot = {
      portion: '1', of: '2', complex: '3', data: '4',
    };
    const getProductsBySearchQueryMock = jest.spyOn(searchUtils, 'getProductsBySearchQuery')
      .mockImplementation(() => searchResults);

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call data handler', () => {
      searchReducer({ ...state }, {
        type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
        payload: snapshot,
      });

      expect(getProductsBySearchQueryMock).toHaveBeenCalledTimes(1);
    });

    it('should provide proper data to handler', () => {
      searchReducer({ ...state }, {
        type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
        payload: snapshot,
      });

      expect(getProductsBySearchQueryMock).toHaveBeenCalledWith(snapshot, query);
    });

    it('should reflect end of fetching procedure', () => {
      expect(searchReducer(state, {
        type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
        payload: snapshot,
      })).toEqual({
        ...initialState, query, products: searchResults, isFetching: false,
      });
    });

    it('should add found products to state', () => {
      expect(searchReducer(state, {
        type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
        payload: searchResults,
      })).toEqual({
        ...initialState, query, products: searchResults, isFetching: false,
      });
    });
  });

  describe('SEARCH_PRODUCTS_FAILURE', () => {
    const error = 'fetching error';

    it('should reflect failure of fetching procedure', () => {
      const state = { ...initialState, isFetching: true };

      expect(searchReducer(state, {
        type: SearchTypes.SEARCH_PRODUCTS_FAILURE,
        payload: error,
      })).toEqual({ ...initialState, isFetching: false, errorMessage: error });
    });

    it('should store an error', () => {
      const state = { ...initialState, isFetching: false };

      expect(searchReducer(state, {
        type: SearchTypes.SEARCH_PRODUCTS_FAILURE,
        payload: error,
      })).toEqual({ ...initialState, errorMessage: error });
    });
  });
});
