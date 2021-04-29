import React from 'react';
import { mount, shallow } from 'enzyme';
import { SearchBar, mapDispatchToProps } from '../../../../components/search/search.component';
import { searchProductsStart } from '../../../../redux/search/search.actions';

describe('Components: Search Bar', () => {
  describe('Search Bar', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<SearchBar />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render input', () => {
      expect(wrapper.find('FormInputContainer')).toHaveLength(1);
    });

    it('should render input with proper attributes', () => {
      expect(wrapper.find('FormInputContainer').prop('name')).toEqual('search');
      expect(wrapper.find('FormInputContainer').prop('type')).toEqual('search');
    });

    xit('should be able to trigger sign up', () => {
      const searchProductsStartMock = jest.fn();
      const mountedWrapper = mount(
        <SearchBar
          searchProductsStart={searchProductsStartMock}
          history={[]}
        />,
      );

      mountedWrapper.find('input').prop('onKeyDown')({ key: 'Enter', target: { value: 'query' } });
      expect(searchProductsStartMock).toHaveBeenCalledTimes(1);
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
