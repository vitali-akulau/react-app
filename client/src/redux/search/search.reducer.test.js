import searchReducer from './search.reducer';
import SearchTypes from './search.types';

describe('Redux: Search Reducer', () => {
  const initialState = {
    products: null,
    isFetching: false,
    errorMessage: undefined,
  };

  it('should return initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state if unrecognized action provided', () => {
    const unrecognizedAction = { type: 'DO_SOMETHING', payload: 'payload' };

    expect(searchReducer(undefined, unrecognizedAction)).toEqual(initialState);
  });

  describe('SEARCH_PRODUCTS_START', () => {
    const state = { ...initialState };

    it('should reflect start of fetching procedure', () => {
      expect(searchReducer(state, { type: SearchTypes.SEARCH_PRODUCTS_START }))
        .toEqual({ ...initialState, isFetching: true });
    });
  });

  describe('SEARCH_PRODUCTS_SUCCESS', () => {
    const searchResults = [{ name: 'p1' }, { name: 'p2' }];

    it('should reflect end of fetching procedure', () => {
      const state = { ...initialState, isFetching: true };

      expect(searchReducer(state, {
        type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
        payload: searchResults,
      })).toEqual({ ...initialState, products: searchResults, isFetching: false });
    });

    it('should add found products to state', () => {
      const state = { ...initialState, isFetching: false };

      expect(searchReducer(state, {
        type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
        payload: searchResults,
      })).toEqual({ ...initialState, products: searchResults });
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
