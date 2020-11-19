import { createSelector } from 'reselect';

const selectSearch = (state) => state.search;

const selectQueriedProducts = createSelector(
  [selectSearch],
  (search) => search.products,
);

export default selectQueriedProducts;
