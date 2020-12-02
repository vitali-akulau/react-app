import {
  selectCartItems,
  selectCartHidden,
  selectCartItemsCount,
  selectCartTotal,
} from './cart.selectors';

describe('Redux: Cart Selectors', () => {
  const mockState = {
    cart: {
      hidden: true,
      cartItems: [
        { id: 1, quantity: 3, price: 10 },
        { id: 2, quantity: 5, price: 20 },
      ],
    },
  };

  it('"selectCartItems" should return items added to cart', () => {
    expect(selectCartItems(mockState)).toEqual(mockState.cart.cartItems);
  });

  it('"selectCartHidden" should return cart dropdown current state', () => {
    expect(selectCartHidden(mockState)).toEqual(mockState.cart.hidden);
  });

  it('"selectCartItemsCount" should return overall quantity of added items', () => {
    expect(selectCartItemsCount(mockState)).toEqual(8);
  });

  it('"selectCartItemsCount" should NOT return number of added products', () => {
    expect(selectCartItemsCount(mockState)).not.toEqual(mockState.cart.cartItems.length);
  });

  it('"selectCartTotal" should return overall price of added items', () => {
    expect(selectCartTotal(mockState)).toEqual(130);
  });

  it('"selectCartTotal" should NOT return sum of prices of added products', () => {
    expect(selectCartTotal(mockState)).not.toEqual(30);
  });
});
