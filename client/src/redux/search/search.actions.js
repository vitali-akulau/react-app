import SearchTypes from './search.types';

export const searchProductsStart = (searchQuery) => ({
  type: SearchTypes.SEARCH_PRODUCTS_START,
  payload: searchQuery,
});

export const searchProductsSuccess = (snapshot, searchQuery) => ({
  type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
  payload: { snapshot, searchQuery },
});

export const searchProductsFailure = (errorMessage) => ({
  type: SearchTypes.SEARCH_PRODUCTS_FAILURE,
  payload: errorMessage,
});
