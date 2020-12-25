import React from 'react';
import { shallow } from 'enzyme';
import { reduce } from 'lodash';
import { CartIcon, mapStateToProps, mapDispatchToProps } from '../../../../components/cart-icon/cart-icon.component';
import { toggleCartDropdown } from '../../../../redux/cart/cart.actions';

describe('Components: Cart Icon', () => {
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
  const itemsCount = reduce(initialState.cart.cartItems, (accumulator, next) => (
    accumulator + next.quantity
  ), 0);

  describe('Cart Icon', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CartIcon itemsCount={itemsCount} />);
    });

    it('should show added items count', () => {
      expect(wrapper.find('ItemCountContainer').prop('children')).toEqual(itemsCount);
    });

    it('should show zero count if cart is empty', () => {
      wrapper.setProps({ itemsCount: 0 });

      expect(wrapper.find('ItemCountContainer').prop('children')).toEqual(0);
    });

    it('should render cart svg icon', () => {
      expect(wrapper.find('ShoppingIconContainer')).toHaveLength(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      expect(mapStateToProps(initialState)).toContainEntry(['itemsCount', itemsCount]);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn();

      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ toggleCartDropdown }));
    });
  });
});
