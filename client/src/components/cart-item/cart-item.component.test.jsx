import React from 'react';
import { shallow } from 'enzyme';

import CartItem from './cart-item.component';

describe('Cart Item Component', () => {
  let wrapper;

  it('renders something', () => {
    const props = {
      imageUrl: '',
      name: 'name',
      price: 100,
      quantity: 15,
    };

    const wrapper = shallow(<CartItem props={props} />);
    console.log(shallow(<CartItem />));
    // expect(wrapper.find('button').length).toEqual(1);
  });

  xit('', () => {

  });

  xit('', () => {

  });

  xit('', () => {

  });

  xit('', () => {

  });

  xit('', () => {

  });
});
