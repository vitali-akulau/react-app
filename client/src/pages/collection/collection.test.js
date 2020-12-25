import React from 'react';
import { shallow } from 'enzyme';
import { capitalize } from 'lodash';
import { CollectionPage, mapStateToProps } from './collection.component';
import * as shopSelectors from '../../redux/shop/shop.selectors';

describe('Pages: Collection Page', () => {
  const initialState = {
    shop: {
      collections: [{
        id: 'OUZXkEaW1dTugEW0673i',
        title: 'Hats',
        routeName: 'hats',
        items: [
          {
            id: 5,
            imageUrl: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
            name: 'Green Beanie',
            price: 18,
          },
          {
            id: 4,
            imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
            name: 'Grey Brim',
            price: 25,
          },
          {
            id: 6,
            imageUrl: 'https://i.ibb.co/rKBDvJX/palm-tree-cap.png',
            name: 'Palm Tree Cap',
            price: 14,
          },
          {
            id: 7,
            imageUrl: 'https://i.ibb.co/bLB646Z/red-beanie.png',
            name: 'Red Beanie',
            price: 18,
          },
          {
            id: 8,
            imageUrl: 'https://i.ibb.co/1f2nWMM/wolf-cap.png',
            name: 'Wolf Cap',
            price: 14,
          },
        ],
      }],
    },
  };
  const collection = initialState.shop.collections[0];

  describe('Collection Page', () => {
    const wrapper = shallow(
      <CollectionPage
        collection={collection}
        match={{ collectionId: collection.id }}
      />,
    );

    it('should render collection items', () => {
      expect(wrapper.find('Connect(CollectionItem)')).toHaveLength(collection.items.length);
    });

    it('should render title', () => {
      expect(wrapper.find('CollectionPageTitle').text()).toEqual(capitalize(collection.title));
    });
  });

  xdescribe('mapStateToProps', () => {
    it('should map state', () => {
      const selectCollectionMock = jest.spyOn(shopSelectors, 'selectCollection');
      selectCollectionMock.mockImplementation(() => initialState.shop.collections[0]);

      expect(mapStateToProps(initialState)).toContainEntry(['collection', collection]);
    });
  });
});
