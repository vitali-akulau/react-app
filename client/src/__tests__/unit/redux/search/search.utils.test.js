import { getProductsBySearchQuery } from '../../../../redux/search/search.utils';
import * as firebaseUtils from '../../../../firebase/firebase.utils';

describe('Redux: Search Utils', () => {
  describe('getProductsBySearchQuery', () => {
    const products = {
      valid: {
        exact: { id: 123, name: 'jacket' },
        upperCased: { id: 122, name: 'JACKET' },
        capitalized: { id: 124, name: "Jacket Levi's" },
        twoWords: { id: 125, name: 'black jacket' },
      },
      invalid: {
        different: { id: 12, name: 'boots' },
      },
    };
    const collectionMap = [
      {
        id: 1,
        title: 'collection_1',
        items: [products.valid.capitalized, products.valid.upperCased, products.invalid.different],
      },
      {
        id: 2,
        title: 'collection_2',
        items: [products.valid.exact, products.valid.twoWords],
      },
    ];
    const snapshot = {
      portion: '1', of: '2', complex: '3', data: '4',
    };
    const convertCollectionsSnapshotToMapMock = jest.spyOn(firebaseUtils, 'convertCollectionsSnapshotToMap')
      .mockImplementation(() => collectionMap);
    const searchQuery = 'jacket';

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call data handler', () => {
      getProductsBySearchQuery(snapshot, searchQuery);
      expect(convertCollectionsSnapshotToMapMock).toHaveBeenCalledTimes(1);
    });

    it('should pass proper data to handler', () => {
      getProductsBySearchQuery(snapshot, searchQuery);
      expect(convertCollectionsSnapshotToMapMock).toHaveBeenCalledWith(snapshot);
    });

    it('should search for valid products', () => {
      expect(getProductsBySearchQuery(snapshot, searchQuery))
        .toIncludeAllMembers(Object.values(products.valid));
    });

    it('should ignore query case', () => {
      const query = 'JACKET';

      expect(getProductsBySearchQuery(snapshot, query))
        .toIncludeAllMembers(Object.values(products.valid));
    });

    it('should search for valid products if query has two words', () => {
      const query = 'black jacket';

      expect(getProductsBySearchQuery(snapshot, query))
        .toIncludeAllMembers([products.valid.twoWords]);
    });

    it('should return empty array if nothing is found', () => {
      const query = 'flowers wallpapers';

      expect(getProductsBySearchQuery(snapshot, query))
        .toBeEmpty();
    });
  });
});
