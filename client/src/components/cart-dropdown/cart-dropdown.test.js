import React from 'react';
import { shallow } from 'enzyme';
import { CartDropdown, mapStateToProps } from './cart-dropdown.component';

describe('Components: Cart Dropdown', () => {
  const initialState = {
    cart: {
      cartItems: [
        {
          imageUrl: 'https://www.product-item-image.com/smth.jpeg',
          name: 'Levi\'s 512',
          price: 50,
          quantity: 4,
          id: 234,
        },
        {
          imageUrl: 'https://www.product-item-image.com/smth-1.jpeg',
          name: 'Nike Air Max 90',
          price: 150,
          quantity: 2,
          id: 14,
        },
        {
          imageUrl: 'https://www.product-item-image.com/smth-2.jpeg',
          name: 'Jack Wolfskin Red River Shirt',
          price: 40,
          quantity: 1,
          id: 67,
        },
      ],
    },
  };

  describe('Cart Dropdown', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CartDropdown cartItems={[]} />);
    });

    it('should render empty state if there is not items provided', () => {
      expect(wrapper.find('EmptyMessageContainer').text()).toEqual('Your cart is empty');
    });

    it('should render added items', () => {
      wrapper.setProps({ cartItems: initialState.cart.cartItems });

      expect(wrapper.find('Memo(CartItem)')).toHaveLength(initialState.cart.cartItems.length);
    });

    it('should pass props to cart items', () => {
      wrapper.setProps({ cartItems: initialState.cart.cartItems });

      initialState.cart.cartItems.forEach((cartItemData, index) => {
        expect(wrapper.find('Memo(CartItem)').at(index).props().item)
          .toEqual({ ...cartItemData });
      });
    });

    it('should render "GO TO CHECKOUT" button', () => {
      wrapper.setProps({ cartItems: initialState.cart.cartItems });

      expect(wrapper.find('CustomButton').prop('children')).toEqual('GO TO CHECKOUT');
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      expect(mapStateToProps(initialState)).toContainEntry(['cartItems', initialState.cart.cartItems]);
    });
  });
});
