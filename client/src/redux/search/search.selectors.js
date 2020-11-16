import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import * as _ from 'lodash';
import { selectCollections } from '../shop/shop.selectors';

export const selectAllProducts = createSelector(
  [selectCollections],
  (collections) => _.flatten(_.map(collections, ({ items }) => items)),
);

export const selectQueriedProducts = memoize((query) => createSelector(
  [selectAllProducts],
  (allProducts) => _.filter(allProducts, ({ name }) => (
    _.toLower(name).includes(_.toLower(query))
  )),
));
