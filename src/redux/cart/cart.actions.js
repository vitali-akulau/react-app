import CartTypes from './cart.types';

export const toggleCartDropdown = () => ({
  type: CartTypes.TOGGLE_CART_DROPDOWN,
});

export const addItem = (item) => ({
  type: CartTypes.ADD_TO_CART,
  payload: item,
});
