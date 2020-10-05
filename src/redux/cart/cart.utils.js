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

export const clearItemFromCart = (cartItems, itemToRemove) => _.reject(cartItems, {id: itemToRemove.id});
