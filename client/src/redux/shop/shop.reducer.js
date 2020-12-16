import ShopTypes from './shop.types';
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: convertCollectionsSnapshotToMap(action.payload),
        isFetching: false,
      };
    case ShopTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
