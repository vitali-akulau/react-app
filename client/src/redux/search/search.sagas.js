import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import * as _ from 'lodash';
import SearchTypes from './search.types';
import { searchProductsSuccess, searchProductsFailure } from './search.actions';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';

const getProductsBySearchQuery = (collections, searchQuery) => {
  const allProducts = _.flatten(_.map(collections, 'items'));

  _.filter(allProducts, ({ name }) => (
    _.toLower(name).includes(_.toLower(searchQuery))
  ));
};

export function* searchProductsStartAsync({ payload: searchQuery }) {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    const products = yield call(getProductsBySearchQuery, collectionsMap, searchQuery);

    yield put(searchProductsSuccess(products));
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
