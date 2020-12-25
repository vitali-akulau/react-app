import React from 'react';
import { shallow } from 'enzyme';
import { SearchResultsPage, mapStateToProps } from '../../../../pages/search-results/search-results.component';

describe('Pages: Search Results', () => {
  const initialState = {
    search: {
      isFetching: false,
      products: [
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
  };

  describe('Search Results', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<SearchResultsPage products={[]} />);
    });

    it('should pass found products', () => {
      wrapper.setProps({ products: initialState.search.products });

      expect(wrapper.find('CollectionPreview').prop('items')).toEqual(initialState.search.products);
    });

    it('should render empty state if nothing found', () => {
      wrapper.setProps({ products: [] });

      expect(wrapper.find('EmptyResultsContainer').text()).toEqual('Nothing found...');
    });

    it('should render empty state if user starts with srp', () => {
      wrapper.setProps({ products: null });

      expect(wrapper.find('EmptyResultsContainer').text()).toEqual('Nothing found...');
    });

    it('should render page title', () => {
      expect(wrapper.find('SearchTitle').text()).toEqual('SEARCH');
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      expect(mapStateToProps(initialState))
        .toContainEntries([
          ['isLoading', initialState.search.isFetching],
          ['products', initialState.search.products],
        ]);
    });
  });
});
