import React from 'react';
import { shallow } from 'enzyme';
import { ShopPage, mapDispatchToProps } from '../../../../pages/shop/shop.component';
import { fetchCollectionsStart } from '../../../../redux/shop/shop.actions';

describe('Pages: Shop Page', () => {
  xdescribe('Shop Page', () => {
    it('should render without error', () => {
      const wrapper = shallow(<ShopPage />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn();

      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ fetchCollectionsStart }));
    });
  });
});
