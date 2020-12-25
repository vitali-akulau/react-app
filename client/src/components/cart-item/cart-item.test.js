import React from 'react';
import { shallow } from 'enzyme';
import CartItem from './cart-item.component';

describe('Components: Cart Item', () => {
  const itemData = {
    id: 1,
    imageUrl: 'https//www.google.com/',
    name: "Levi's Jeans",
    price: '50',
    quantity: '4',
  };

  const wrapper = shallow(<CartItem item={itemData} />);

  it('should render item name', () => {
    expect(wrapper.find("[data-test='item-name-1']").text())
      .toEqual(itemData.name);
  });

  it('should render item total', () => {
    expect(wrapper.find("[data-test='item-total-1']").text())
      .toEqual(`${itemData.quantity}x${itemData.price}`);
  });

  it('should render item image', () => {
    expect(wrapper.find('img').prop('src'))
      .toEqual(itemData.imageUrl);
  });
});
