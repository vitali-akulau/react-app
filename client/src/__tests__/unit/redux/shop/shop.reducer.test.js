import shopReducer from '../../../../redux/shop/shop.reducer';
import ShopTypes from '../../../../redux/shop/shop.types';
import * as firebaseUtils from '../../../../firebase/firebase.utils';

describe('Redux: Shop Reducer', () => {
  const initialState = {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
  };

  it('should return initial state', () => {
    expect(shopReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state if unrecognized action provided', () => {
    const unrecognizedAction = { type: 'DO_SOMETHING', payload: 'payload' };

    expect(shopReducer(undefined, unrecognizedAction)).toEqual(initialState);
  });

  describe('FETCH_COLLECTIONS_START', () => {
    const state = { ...initialState };

    it('should reflect start of fetching procedure', () => {
      expect(shopReducer(state, { type: ShopTypes.FETCH_COLLECTIONS_START }))
        .toEqual({ ...initialState, isFetching: true });
    });
  });

  describe('FETCH_COLLECTIONS_SUCCESS', () => {
    const state = { ...initialState, isFetching: true };
    const collections = [{ id: 1, items: [{ name: 'name1' }] }, { id: 2, items: [{ name: 'name2' }] }];
    const snapshot = {
      portion: '1', of: '2', complex: '3', data: '4',
    };
    const convertCollectionsSnapshotToMapMock = jest.spyOn(firebaseUtils, 'convertCollectionsSnapshotToMap')
      .mockImplementation(() => (collections));
    const runReducer = (currentState, requestsnapshot) => shopReducer(currentState, {
      type: ShopTypes.FETCH_COLLECTIONS_SUCCESS,
      payload: requestsnapshot,
    });

    it('should call data handler', () => {
      runReducer(state, snapshot);

      expect(convertCollectionsSnapshotToMapMock).toHaveBeenCalledTimes(1);
    });

    it('should provide proper data to data handler', () => {
      runReducer(state, snapshot);

      expect(convertCollectionsSnapshotToMapMock).toHaveBeenCalledWith(snapshot);
    });

    it('should reflect end of fetching procedure', () => {
      expect(runReducer(state, snapshot))
        .toEqual({ ...initialState, collections, isFetching: false });
    });

    it('should add collections to state', () => {
      expect(runReducer(state, snapshot))
        .toEqual({ ...initialState, collections, isFetching: false });
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
