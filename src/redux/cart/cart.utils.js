import * as _ from 'lodash';

export const addItemToCart = (cartItems, itemToAdd) => {
  const existingItem = _.find(cartItems, { id: itemToAdd.id });

  if (existingItem) {
    return _.map(cartItems, item => {
      return (item.id === itemToAdd.id)
        ? { ...item, quantity: item.quantity + 1 }
        : item
    });
  }

  return [ ...cartItems, { ...itemToAdd, quantity: 1 } ]
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const existingItemQuantity = _.find(cartItems, { id: itemToRemove.id }).quantity;

  return (existingItemQuantity === 1)
      ? clearItemFromCart(cartItems, itemToRemove)
      : _.map(cartItems, item => {
        return (item.id === itemToRemove.id)
            ? { ...item, quantity: item.quantity - 1 }
            : item
      });
}

export const clearItemFromCart = (cartItems, itemToRemove) => _.reject(cartItems, {id: itemToRemove.id});
