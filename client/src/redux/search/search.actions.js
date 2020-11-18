import SearchTypes from './search.types';

export const searchProductsStart = () => ({
  type: SearchTypes.SEARCH_PRODUCTS_START,
});

export const searchProductsSuccess = (products) => ({
  type: SearchTypes.SEARCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const searchProductsFailure = (errorMessage) => ({
  type: SearchTypes.SEARCH_PRODUCTS_FAILURE,
  payload: errorMessage,
});
