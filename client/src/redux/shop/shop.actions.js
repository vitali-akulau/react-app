import ShopTypes from './shop.types';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsAsync = () => (dispatch) => {
  const collectionRef = firestore.collection('collections');
  dispatch(fetchCollectionsStart());

  collectionRef.get()
    .then(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    })
    .catch((error) => {
      dispatch(fetchCollectionsFailure(error.message));
    });
};
