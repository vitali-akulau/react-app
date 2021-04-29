import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutCartItem, mapDispatchToProps } from '../../../../components/checkout-cart-item/checkout-cart-item.component';
import { addItem, clearItemFromCart, removeItem } from '../../../../redux/cart/cart.actions';
import getMockedState from '../../../utils/mock-state-provider';

describe('Components: Checkout Cart item', () => {
  const [cartItem] = getMockedState(['cart']).cart.cartItems;

  describe('Checkout Cart Item', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CheckoutCartItem cartItem={cartItem} />);
    });

    it('should get image from proper resource', () => {
      expect(wrapper.find('img').prop('src')).toEqual(cartItem.imageUrl);
    });

    it('should show added product name', () => {
      expect(wrapper.find('NameContainer').prop('children')).toEqual(cartItem.name);
    });

    it('should show added product quantity', () => {
      expect(wrapper.find('ValueContainer').prop('children')).toEqual(cartItem.quantity);
    });

    it('should show added product quantity', () => {
      expect(wrapper.find('PriceContainer').prop('children')).toEqual(cartItem.price);
    });

    it('should render "reduce quantity" arrow', () => {
      expect(wrapper.find('ArrowContainer').at(0).prop('children'))
        .toEqual('❮');
    });

    it('should render "increase quantity" arrow', () => {
      expect(wrapper.find('ArrowContainer').at(1).prop('children'))
        .toEqual('❯');
    });

    it('should render "remove item" control', () => {
      expect(wrapper.find('RemoveButton').prop('children'))
        .toEqual('✕');
    });

    it('should be able to decrease added product quantity', () => {
      const removeItemMock = jest.fn();

      wrapper.setProps({ removeItem: removeItemMock });
      wrapper.find('ArrowContainer').at(0).prop('onClick')();

      expect(removeItemMock).toHaveBeenCalledTimes(1);
    });

    it('should be able to increase added product quantity', () => {
      const addItemMock = jest.fn();

      wrapper.setProps({ addItem: addItemMock });
      wrapper.find('ArrowContainer').at(1).prop('onClick')();

      expect(addItemMock).toHaveBeenCalledTimes(1);
    });

    it('should be able to increase added product quantity', () => {
      const clearItemFromCartMock = jest.fn();

      wrapper.setProps({ clearItem: clearItemFromCartMock });
      wrapper.find('RemoveButton').prop('onClick')();

      expect(clearItemFromCartMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    it('should dispatch actions', () => {
      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ addItem, clearItem: clearItemFromCart, removeItem }));
    });
  });
});
