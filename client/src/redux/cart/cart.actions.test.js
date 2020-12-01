import * as cartActions from './cart.actions';
import CartTypes from './cart.types';

describe('Redux: Cart Actions', () => {
  const item = {
    id: '1',
    name: 'name',
  };

  it('"toggleCartDropdown" should create action to toggle cart dropdown', () => {
    expect(cartActions.toggleCartDropdown())
      .toEqual({ type: CartTypes.TOGGLE_CART_DROPDOWN });
  });

  it('"addItem" should create action to add item to cart', () => {
    expect(cartActions.addItem(item))
      .toEqual({ type: CartTypes.ADD_TO_CART, payload: item });
  });

  it('"removeItem" should create action to remove item from cart', () => {
    expect(cartActions.removeItem(item))
      .toEqual({ type: CartTypes.REMOVE_ITEM, payload: item });
  });

  it('"clearItemFromCart" should create action to clear item from cart', () => {
    expect(cartActions.clearItemFromCart(item))
      .toEqual({ type: CartTypes.CLEAR_ITEM_FROM_CART, payload: item });
  });

  it('"clearCart" should create action to clear cart', () => {
    expect(cartActions.clearCart())
      .toEqual({ type: CartTypes.CLEAR_CART });
  });
});
