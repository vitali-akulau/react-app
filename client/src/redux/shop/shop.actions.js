import ShopTypes from './shop.types';
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (snapshot) => ({
  type: ShopTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: convertCollectionsSnapshotToMap(snapshot),
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});
