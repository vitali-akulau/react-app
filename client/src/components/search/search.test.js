import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar, mapDispatchToProps } from './search.component';
import { searchProductsStart } from '../../redux/search/search.actions';

describe('Components: Search Bar', () => {
  describe('Search Bar', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<SearchBar />);
    });

    it('should render input', () => {
      expect(wrapper.find('FormInputContainer')).toHaveLength(1);
    });

    it('should render input with proper attributes', () => {
      expect(wrapper.find('FormInputContainer').prop('name')).toEqual('search');
      expect(wrapper.find('FormInputContainer').prop('type')).toEqual('search');
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn();

      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ searchProductsStart }));
    });
  });
});
