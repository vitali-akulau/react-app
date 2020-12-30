import SearchTypes from './search.types';
import { getProductsBySearchQuery } from './search.utils';

const INITIAL_STATE = {
  query: null,
  products: null,
  isFetching: false,
  errorMessage: undefined,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchTypes.SEARCH_PRODUCTS_START:
      return {
        ...state,
        query: action.payload,
        isFetching: true,
      };
    case SearchTypes.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: getProductsBySearchQuery(action.payload, state.query),
        isFetching: false,
      };
    case SearchTypes.SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
