import React from 'react';
import { shallow } from 'enzyme';
import { reduce } from 'lodash';
import { CheckoutPage, mapStateToProps } from '../../../../pages/checkout/checkout.component';
import getMockedState from '../../../utils/mock-state-provider';

describe('Pages: Checkout Page', () => {
  const initialState = getMockedState(['cart']);
  const cartTotal = reduce(initialState.cart.cartItems, (accumulator, next) => (
    accumulator + (next.price * next.quantity)
  ), 0);

  describe('Checkout Page', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CheckoutPage cartItems={initialState.cart.cartItems} total={cartTotal} />);
    });

    it('should render page item headings', () => {
      const headings = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

      headings.forEach((heading, index) => {
        expect(wrapper.find('CheckoutHeaderBlockContainer').at(index).find('span').text())
          .toEqual(heading);
      });
    });

    it('should render all added items', () => {
      expect(wrapper.find('Connect(CheckoutCartItem)')).toHaveLength(initialState.cart.cartItems.length);
    });

    it('should render cart total properly', () => {
      expect(wrapper.find('CheckoutTotal').text()).toEqual(`Total: $${cartTotal}`);
    });

    it('should pass cart total to stripe button', () => {
      expect(wrapper.find('StripeCheckoutButton').prop('price')).toEqual(cartTotal);
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      expect(mapStateToProps(initialState))
        .toContainEntries([['cartItems', initialState.cart.cartItems], ['total', cartTotal]]);
    });
  });
});
