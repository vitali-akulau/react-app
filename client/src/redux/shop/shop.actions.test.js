import * as shopActions from './shop.actions';
import ShopTypes from './shop.types';

describe('Redux: Shop Actions', () => {
  it('"fetchCollectionsStart" should create action to start fetching', () => {
    expect(shopActions.fetchCollectionsStart())
      .toEqual({ type: ShopTypes.FETCH_COLLECTIONS_START });
  });

  it('"fetchCollectionsSuccess" should create action to successful fetching', () => {
    const collectionsMap = [{ id: 1, name: 'name1' }, { id: 2, name: 'name2' }];

    expect(shopActions.fetchCollectionsSuccess(collectionsMap))
      .toEqual({ type: ShopTypes.FETCH_COLLECTIONS_SUCCESS, payload: collectionsMap });
  });

  it('"fetchCollectionsFailure" should create action to failed fetching', () => {
    const error = 'error message';

    expect(shopActions.fetchCollectionsFailure(error))
      .toEqual({ type: ShopTypes.FETCH_COLLECTIONS_FAILURE, payload: error });
  });
});
