import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { searchProductsSuccess, searchProductsFailure } from './search.actions';
import SearchTypes from './search.types';
import { getCollectionSnapshot } from '../../firebase/firebase.utils';

export function* searchProductsStartAsync() {
  try {
    const snapshot = yield call(getCollectionSnapshot, 'collections');
    yield put(searchProductsSuccess(snapshot));
  } catch (error) {
    yield put(searchProductsFailure(error));
  }
}

export function* searchProductsStart() {
  yield takeLatest(SearchTypes.SEARCH_PRODUCTS_START, searchProductsStartAsync);
}

export function* searchSagas() {
  yield all([
    call(searchProductsStart),
  ]);
}
