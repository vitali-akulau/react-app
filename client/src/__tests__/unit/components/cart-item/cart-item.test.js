import React from 'react';
import { shallow } from 'enzyme';
import CartItem from '../../../../components/cart-item/cart-item.component';
import getMockedState from "../../../utils/mock-state-provider";

describe('Components: Cart Item', () => {
  const cartItem = getMockedState(['cart']).cart.cartItems[0];
  const wrapper = shallow(<CartItem item={cartItem} />);

  it('should render item name', () => {
    expect(wrapper.find(`[data-test='item-name-${cartItem.id}']`).text())
      .toEqual(cartItem.name);
  });

  it('should render item total', () => {
    expect(wrapper.find(`[data-test='item-total-${cartItem.id}']`).text())
      .toEqual(`${cartItem.quantity}x${cartItem.price}`);
  });

  it('should render item image', () => {
    expect(wrapper.find('img').prop('src')).toEqual(cartItem.imageUrl);
  });
});
