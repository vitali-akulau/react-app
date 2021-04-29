import React from 'react';
import { shallow } from 'enzyme';
import { SearchResultsPage, mapStateToProps } from '../../../../pages/search-results/search-results.component';
import getMockedState from "../../../utils/mock-state-provider";

describe('Pages: Search Results', () => {
  const initialState = getMockedState(['search']);

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
