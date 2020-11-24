import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CartItem from './cart-item.component';

describe('Cart Item Component', () => {
  it('should match snapshot', () => {
    const item = {
      imageUrl: 'somepath',
      name: 'name',
      price: 100,
      quantity: 15,
    };

    const wrapper = shallow(<CartItem item={item} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
