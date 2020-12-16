import { runSaga } from 'redux-saga';
import { takeLatest, call } from 'redux-saga/effects';
import { searchProductsStart, searchProductsStartAsync } from './search.sagas';
import { searchProductsSuccess, searchProductsFailure } from './search.actions';
import SearchTypes from './search.types';
import * as firebaseUtils from '../../firebase/firebase.utils';

describe('Redux: Search Sagas', () => {
  const runGenerator = async (dispatched) => runSaga({
    dispatch: (action) => dispatched.push(action),
  }, searchProductsStartAsync).toPromise();

  describe('searchProductsStart', () => {
    const genObject = searchProductsStart();

    it('should take latest "SEARCH_PRODUCTS_START" action and call "searchProductsStartAsync"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(SearchTypes.SEARCH_PRODUCTS_START, searchProductsStartAsync));
    });

    it('should be done on next iteration', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('searchProductsStartAsync', () => {
    const getCollectionSnapshotMock = jest.spyOn(firebaseUtils, 'getCollectionSnapshot');

    it('should request proper collection', async () => {
      const genObject = searchProductsStartAsync();

      expect(genObject.next().value).toEqual(call(getCollectionSnapshotMock, 'collections'));
    });

    it('should put "success" actions', async () => {
      const dispatched = [];
      const snapshot = {
        portion: '1', of: '2', complex: '3', data: '4',
      };
      getCollectionSnapshotMock.mockImplementation(() => Promise.resolve(snapshot));

      await runGenerator(dispatched);

      expect(dispatched[0]).toEqual(searchProductsSuccess(snapshot));
    });

    it('should put "failure" action', async () => {
      const dispatched = [];
      const error = {
        message: 'some error',
      };
      getCollectionSnapshotMock.mockImplementation(() => Promise.reject(error));

      await runGenerator(dispatched);

      expect(dispatched[0]).toEqual(searchProductsFailure(error));
    });
  });
});
