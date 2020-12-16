import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import ShopTypes from './shop.types';
import { getCollectionSnapshot } from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';

export function* fetchCollectionsAsync() {
  try {
    const snapshot = yield call(getCollectionSnapshot, 'collections');
    yield put(fetchCollectionsSuccess(snapshot));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart),
  ]);
}
