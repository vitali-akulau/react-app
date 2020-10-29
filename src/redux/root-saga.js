import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSaga() {
  all([
    yield call(fetchCollectionsStart),
  ]);
}
