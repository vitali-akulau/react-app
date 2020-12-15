import { runSaga } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';
import ShopTypes from './shop.types';
import { fetchCollectionsStart, fetchCollectionsAsync } from './shop.sagas';
import * as firebaseUtils from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';

describe('Redux: Shop Sagas', () => {
  describe('fetchCollectionsStart', () => {
    const genObject = fetchCollectionsStart();

    it('should take latest "FETCH_COLLECTIONS_START" action and call "fetchCollectionsAsync"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(ShopTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync));
    });

    it('should be done on the next call', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('fetchCollectionsAsync', () => {
    const runGenerator = async (dispatched) => runSaga({
      dispatch: (action) => dispatched.push(action),
    }, fetchCollectionsAsync).toPromise();
    const getCollectionSnapshotMock = jest.spyOn(firebaseUtils, 'getCollectionSnapshot');

    it('should request proper collection', () => {
      const genObject = fetchCollectionsAsync();

      expect(genObject.next().value).toEqual(call(getCollectionSnapshotMock, 'collections'));
    });

    it('should put "success" actions', async () => {
      const dispatched = [];
      const snapshot = {
        portion: '1', of: '2', complex: '3', data: '4',
      };
      getCollectionSnapshotMock.mockImplementation(() => Promise.resolve(snapshot));

      await runGenerator(dispatched);

      expect(dispatched[0]).toEqual(fetchCollectionsSuccess(snapshot));
    });

    it('should put "success" actions', async () => {
      const dispatched = [];
      const error = {
        message: 'some error',
      };
      getCollectionSnapshotMock.mockImplementation(() => Promise.reject(error));

      await runGenerator(dispatched);

      expect(dispatched[0]).toEqual(fetchCollectionsFailure(error.message));
    });
  });
});
