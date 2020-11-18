import SearchTypes from './search.types';

const INITIAL_STATE = {
  products: null,
  isFetching: false,
  errorMessage: undefined,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchTypes.SEARCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case SearchTypes.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
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
