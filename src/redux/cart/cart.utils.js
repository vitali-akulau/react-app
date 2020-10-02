export const addItemToCart = (cartItems, itemToAdd) => {
  const existingCartItems = cartItems;

  if (existingCartItems[itemToAdd.id]) {
    existingCartItems[itemToAdd.id].quantity += 1;
  } else {
    existingCartItems[itemToAdd.id] = { ...itemToAdd, quantity: 1 }
  }

  return existingCartItems
};
