import SearchTypes from './search.types';

export const searchProductsStart = (searchQuery) => ({
  type: SearchTypes.SEARCH_PRODUCTS_START,
  payload: searchQuery,
});

export const searchProductsSuccess = (products) => ({
  type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const searchProductsFailure = (errorMessage) => ({
  type: SearchTypes.SEARCH_PRODUCTS_FAILURE,
  payload: errorMessage,
});
