import * as shopActions from './shop.actions';
import * as firebaseUtils from '../../firebase/firebase.utils';
import ShopTypes from './shop.types';

describe('Redux: Shop Actions', () => {
  const snapshot = {
    portion: '1', of: '2', complex: '3', data: '4',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('"fetchCollectionsStart" should create action to start fetching', () => {
    expect(shopActions.fetchCollectionsStart())
      .toEqual({ type: ShopTypes.FETCH_COLLECTIONS_START });
  });

  it('"fetchCollectionsSuccess" should create action to successful fetching', () => {
    expect(shopActions.fetchCollectionsSuccess(snapshot))
      .toEqual({ type: ShopTypes.FETCH_COLLECTIONS_SUCCESS, payload: snapshot });
  });

  it('"fetchCollectionsFailure" should create action to failed fetching', () => {
    const error = 'error message';

    expect(shopActions.fetchCollectionsFailure(error))
      .toEqual({ type: ShopTypes.FETCH_COLLECTIONS_FAILURE, payload: error });
  });
});
