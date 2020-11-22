import { createSelector } from 'reselect';

const selectSearch = (state) => state.search;

export const selectQueriedProducts = createSelector(
  [selectSearch],
  (search) => search.products,
);

export const selectIsFetching = createSelector(
  [selectSearch],
  (search) => search.isFetching,
);
