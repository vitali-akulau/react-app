import * as _ from 'lodash';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from './cart.utils';

describe('Redux: Cart Utils', () => {
  const item1 = { id: 1, quantity: 2 };
  const item2 = { id: 2, quantity: 1 };
  const itemToAdd = { id: 3 };

  describe('addItemToCart', () => {
    it('should to add item to cart', () => {
      const cart = [{ ...item1 }, { ...item2 }];

      expect(addItemToCart(cart, itemToAdd)).toHaveLength(cart.length + 1);
    });

    it('should add item with proper "id"', () => {
      const cart = [{ ...item1 }, { ...item2 }];

      expect(_.filter(addItemToCart(cart, itemToAdd), { id: itemToAdd.id }).length).toEqual(1);
    });

    it('should append quantity to added item', () => {
      const cart = [{ ...item1 }, { ...item2 }];

      expect(_.find(addItemToCart(cart, itemToAdd), { id: itemToAdd.id }).quantity).toEqual(1);
    });

    it('should increase quantity of existing item', () => {
      const cart = [{ ...item1 }, { ...item2 }];
      const existingItem = { ...item1 };

      expect(_.find(addItemToCart(cart, existingItem), { id: existingItem.id }).quantity)
        .toEqual(existingItem.quantity + 1);
    });
  });

  describe('clearItemFromCart', () => {
    it('should completely remove item from cart', () => {
      const cart = [{ ...item1 }, { ...item2 }];

      expect(_.filter(clearItemFromCart(cart, item2), { id: item2.id }).length).toEqual(0);
    });

    it('should clear item from cart with quantity equal to 1', () => {
      const cart = [{ ...item1 }, { ...item2 }];

      expect(_.filter(clearItemFromCart(cart, item2), { id: item2.id }).length).toEqual(0);
    });

    it('should clear item from cart with quantity more than 1', () => {
      const cart = [{ ...item1 }, { ...item2 }];

      expect(_.filter(clearItemFromCart(cart, item1), { id: item1.id }).length).toEqual(0);
    });

    it('should not affect cart if removal item does not exist in cart', () => {
      const cart = [{ ...item1 }, { ...item2 }];

      expect(clearItemFromCart(cart, itemToAdd)).toEqual(cart);
    });
  });

  describe('removeItemFromCart', () => {
    it('should reduce item quantity if its quantity is more than 1', () => {
      const cart = [{ ...item1 }, { ...item2 }];
      const itemToRemove = { ...item1 };

      expect(_.find(removeItemFromCart(cart, itemToRemove), { id: itemToRemove.id }).quantity)
        .toEqual(itemToRemove.quantity - 1);
    });

    it('should remove item from cart if its quantity is equal to 1', () => {
      const cart = [{ ...item1 }, { ...item2 }];
      const itemToRemove = { ...item2 };

      expect(_.filter(removeItemFromCart(cart, itemToRemove), { id: itemToRemove.id }).length)
        .toEqual(0);
    });
  });
});
