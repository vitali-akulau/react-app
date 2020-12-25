import memoize from 'lodash.memoize';
import * as shopSelectors from '../../../../redux/shop/shop.selectors';

describe('Redux: Shop Selectors', () => {
  const mockState = {
    shop: {
      isFetching: false,
      collections: {
        hats: { items: [{ id: 1 }, { id: 2 }] },
        jackets: { items: [{ id: 3 }, { id: 4 }] },
      },
    },
  };
  const emptyMockState = {
    shop: {
      isFetching: false,
      collections: null,
    },
  };

  it('"selectShop" should return shop', () => {
    expect(shopSelectors.selectShop(mockState)).toEqual(mockState.shop);
  });

  it('"selectCollections" should return collections', () => {
    expect(shopSelectors.selectCollections(mockState)).toEqual(mockState.shop.collections);
  });

  it('"selectCollectionsForPreview" should return collections if they were fetched', () => {
    expect(shopSelectors.selectCollectionsForPreview(mockState))
      .toEqual(Object.values(mockState.shop.collections));
  });

  it('"selectCollectionsForPreview" should NOT return collections if they were NOT fetched', () => {
    expect(shopSelectors.selectCollectionsForPreview(emptyMockState)).toEqual([]);
  });

  it('"selectCollection" should return proper collection', () => {
    expect(shopSelectors.selectCollection('hats')(mockState)).toEqual(mockState.shop.collections.hats);
  });

  it('"selectCollection" should NOT return unknown collection', () => {
    expect(shopSelectors.selectCollection('boots')(mockState)).toEqual(undefined);
  });

  it('"selectCollection" should return "null" if collections were NOT loaded', () => {
    expect(shopSelectors.selectCollection('hats')(emptyMockState)).toEqual(null);
  });

  it('"selectIsFetching" should show fetching status', () => {
    expect(shopSelectors.selectIsFetching(mockState)).toEqual(mockState.shop.isFetching);
  });

  it('"selectIsCollectionsLoaded" should show proper status if collections were loaded', () => {
    expect(shopSelectors.selectIsCollectionsLoaded(mockState)).toEqual(true);
  });

  it('"selectIsCollectionsLoaded" should show proper status if collections were NOT loaded', () => {
    expect(shopSelectors.selectIsCollectionsLoaded(emptyMockState)).toEqual(false);
  });
});
