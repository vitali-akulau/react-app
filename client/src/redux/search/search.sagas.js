import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import * as _ from 'lodash';
import SearchTypes from './search.types';
import { searchProductsSuccess, searchProductsFailure } from './search.actions';
import { fetchCollectionsAsync } from '../shop/shop.sagas';

const getProductsBySearchQuery = (collections, searchQuery) => {
  const allProducts = _.flatten(_.map(collections, ({ items }) => items));

  _.filter(allProducts, ({ name }) => (
    _.toLower(name).includes(_.toLower(searchQuery))
  ));
};

export function* searchProductsStartAsync({ payload: searchQuery }) {
  try {
    const collections = yield call(fetchCollectionsAsync);
    const products = yield call(getProductsBySearchQuery, collections, searchQuery);

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
