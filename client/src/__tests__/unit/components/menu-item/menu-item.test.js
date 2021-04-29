import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from '../../../../components/menu-item/menu-item.component';
import getMockedState from '../../../utils/mock-state-provider';

describe('Components: Menu Item', () => {
  let wrapper;
  const initialState = getMockedState(['directory']);
  const [menuItemData] = initialState.directory.sections;

  beforeEach(() => {
    wrapper = shallow(<MenuItem {...menuItemData} />);
  });

  it('should render "small" menu item container', () => {
    expect(wrapper.find('MenuItemContainer')).toHaveStyleRule('height', '240px');
  });

  it('should render "large" menu item container', () => {
    wrapper.setProps({ size: 'large' });

    expect(wrapper.find('MenuItemContainer')).toHaveStyleRule('height', '380px');
  });

  it('should get background image from proper resource', () => {
    expect(wrapper.find('BackgroundImageContainer'))
      .toHaveStyleRule('background-image', `url(${menuItemData.imageUrl})`);
  });

  it('should show menu item title', () => {
    expect(wrapper.find('ContentTitle').text()).toEqual(menuItemData.title.toUpperCase());
  });

  it('should show menu item subtitle', () => {
    expect(wrapper.find('ContentSubtitle').text()).toEqual('SHOP NOW');
  });
});
