import shopReducer from './shop.reducer';
import ShopTypes from './shop.types';
import searchReducer from "../search/search.reducer"
import SearchTypes from "../search/search.types"

describe('Redux: Shop Reducer', () => {
  const initialState = {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
  };

  it('should return initial state', () => {
    expect(shopReducer(undefined, {})).toEqual(initialState)
  });

  it('should return initial state if unrecognized action provided', () => {
    const unrecognizedAction = { type: 'DO_SOMETHING', payload: 'payload' };

    expect(shopReducer(undefined, unrecognizedAction)).toEqual(initialState)
  });

  describe('FETCH_COLLECTIONS_START', () => {
    const state = { ...initialState };

    it('should reflect start of fetching procedure', () => {
      expect(shopReducer(state, { type: ShopTypes.FETCH_COLLECTIONS_START }))
          .toEqual({ ...initialState, isFetching: true });
    });
  });

  describe('FETCH_COLLECTIONS_SUCCESS', () => {
    const collections = [{ id: 1, items: [{ name: "name1" }] }, { id: 2, items: [{ name: "name2" }] }];

    it('should reflect end of fetching procedure', () => {
      const state = { ...initialState, isFetching: true };

      expect(shopReducer(state, {
        type: ShopTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collections,
      })).toEqual({ ...initialState, collections: collections, isFetching: false });
    });

    it('should add collections to state', () => {
      const state = { ...initialState, isFetching: false };

      expect(shopReducer(state, {
        type: ShopTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collections,
      })).toEqual({ ...initialState, collections: collections });
    });
  });

  describe('FETCH_COLLECTIONS_FAILURE', () => {
    const error = 'fetching error';

    it('should reflect failure of fetching procedure', () => {
      const state = { ...initialState, isFetching: true };

      expect(shopReducer(state, {
        type: ShopTypes.FETCH_COLLECTIONS_FAILURE,
        payload: error,
      })).toEqual({ ...initialState, isFetching: false, errorMessage: error });
    });

    it('should store an error', () => {
      const state = { ...initialState, isFetching: false };

      expect(shopReducer(state, {
        type: ShopTypes.FETCH_COLLECTIONS_FAILURE,
        payload: error,
      })).toEqual({ ...initialState, errorMessage: error });
    });
  });
});
