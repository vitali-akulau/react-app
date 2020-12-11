import { takeLatest } from 'redux-saga/effects';
import { searchProductsStart, searchProductsStartAsync } from './search.sagas';
import SearchTypes from './search.types';

describe('Redux: Search Sagas', () => {
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
});
