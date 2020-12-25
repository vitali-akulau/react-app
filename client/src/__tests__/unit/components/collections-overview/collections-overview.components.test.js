import React from 'react';
import { shallow } from 'enzyme';
import { values, omit } from 'lodash';
import { CollectionsOverview, mapStateToProps } from '../../../../components/collections-overview/collections-overview.component';

describe('Components: Collection Overview', () => {
  const initialState = {
    shop: {
      collections: {
        hats: {
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
        },
        jackets: {
          id: 'ydqp65N0ACW5g1qwfqgu',
          title: 'Jackets',
          routeName: 'jackets',
          items: [
            {
              id: 18,
              imageUrl: 'https://i.ibb.co/XzcwL5s/black-shearling.png',
              name: 'Black Jean Shearling',
              price: 125,
            },
            {
              id: 19,
              imageUrl: 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png',
              name: 'Blue Jean Jacket',
              price: 90,
            },
            {
              id: 20,
              imageUrl: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
              name: 'Grey Jean Jacket',
              price: 90,
            },
            {
              id: 21,
              imageUrl: 'https://i.ibb.co/s96FpdP/brown-shearling.png',
              name: 'Brown Shearling',
              price: 165,
            },
            {
              id: 22,
              imageUrl: 'https://i.ibb.co/M6hHc3F/brown-trench.png',
              name: 'Tan Trench',
              price: 185,
            },
          ],
        },
        sneakers: {
          id: 'FWCoaBgWKTtsJs34HkyW',
          title: 'Sneakers',
          routeName: 'sneakers',
          items: [
            {
              id: 10,
              imageUrl: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
              name: 'Adidas NMD',
              price: 220,
            },
            {
              id: 17,
              imageUrl: 'https://i.ibb.co/Mhh6wBg/timberlands.png',
              name: 'Timberlands',
              price: 200,
            },
            {
              id: 15,
              imageUrl: 'https://i.ibb.co/fMTV342/nike-brown.png',
              name: 'Nike Brown High Tops',
              price: 160,
            },
            {
              id: 13,
              imageUrl: 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png',
              name: 'Nike White AirForce',
              price: 160,
            },
          ],
        },
      },
    },
  };
  const collections = values(initialState.shop.collections);

  describe('Collection Overview', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CollectionsOverview collections={collections} />);
    });

    it('should render all collection previews', () => {
      expect(wrapper.find('CollectionPreview')).toHaveLength(collections.length);
    });

    it('should pass props to collection previews', () => {
      const PREVIEW_ITEMS_NUMBER = 4;
      const expectedProps = (collection) => (
        { ...omit(collection, ['routeName', 'id']), previewItemsNumber: PREVIEW_ITEMS_NUMBER }
      );

      collections.forEach((collection, index) => {
        expect(wrapper.find('CollectionPreview').at(index).props()).toEqual(expectedProps(collection));
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      expect(mapStateToProps(initialState)).toContainEntry(['collections', collections]);
    });
  });
});
