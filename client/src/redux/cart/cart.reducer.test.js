import cartReducer from './cart.reducer';
import CartTypes from './cart.types';
import * as CartHandlers from './cart.utils';

describe('Redux: Cart Reducer', () => {
  const state = { hidden: true, cartItems: [] };
  const finalValues = [{ id: 1 }, { id: 2 }];

  it('should return initial state if no action provided', () => {
    expect(cartReducer(undefined, {})).toEqual(state);
  });

  it('should return initial state if unrecognized action provided', () => {
    const unrecognizedAction = { type: 'DO_SOMETHING', payload: 'payload' };

    expect(cartReducer(undefined, unrecognizedAction)).toEqual(state);
  });

  describe('TOGGLE_CART_DROPDOWN', () => {
    it('should handle toggle to "false"', () => {
      const initialState = { ...state, hidden: true };

      expect(cartReducer(initialState, {
        type: CartTypes.TOGGLE_CART_DROPDOWN,
      })).toEqual({ ...initialState, hidden: !initialState.hidden });
    });

    it('should handle toggle to "true"', () => {
      const initialState = { ...state, hidden: false };

      expect(cartReducer(initialState, {
        type: CartTypes.TOGGLE_CART_DROPDOWN,
      })).toEqual({ ...initialState, hidden: !initialState.hidden });
    });
  });

  describe('ADD_TO_CART', () => {
    const addToCartMock = jest.spyOn(CartHandlers, 'addItemToCart').mockImplementation(() => finalValues);
    const addAction = { type: CartTypes.ADD_TO_CART, payload: { id: 1 } };
    const initialState = { ...state };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call handler function', () => {
      cartReducer(initialState, addAction);

      expect(addToCartMock).toHaveBeenCalled();
    });

    it('should pass proper params to handler function', () => {
      cartReducer(initialState, addAction);

      expect(addToCartMock).toHaveBeenCalledWith(initialState.cartItems, addAction.payload);
    });

    it('should change state of cart items', () => {
      expect(cartReducer(initialState, addAction))
        .toEqual({ ...initialState, cartItems: finalValues });
    });
  });

  describe('REMOVE_ITEM', () => {
    const removeFromCartMock = jest.spyOn(CartHandlers, 'removeItemFromCart').mockImplementation(() => finalValues);
    const removeAction = { type: CartTypes.REMOVE_ITEM, payload: { id: 1 } };
    const initialState = { ...state };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call handler function', () => {
      cartReducer(initialState, removeAction);

      expect(removeFromCartMock).toHaveBeenCalled();
    });

    it('should pass proper params to handler function', () => {
      cartReducer(initialState, removeAction);

      expect(removeFromCartMock).toHaveBeenCalledWith(initialState.cartItems, removeAction.payload);
    });

    it('should change state of cart items', () => {
      expect(cartReducer(initialState, removeAction))
        .toEqual({ ...initialState, cartItems: finalValues });
    });
  });

  describe('CLEAR_ITEM_FROM_CART', () => {
    const clearFromCartMock = jest.spyOn(CartHandlers, 'clearItemFromCart').mockImplementation(() => finalValues);
    const clearFromCartAction = { type: CartTypes.CLEAR_ITEM_FROM_CART, payload: { id: 1 } };
    const initialState = { ...state };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call handler function', () => {
      cartReducer(initialState, clearFromCartAction);

      expect(clearFromCartMock).toHaveBeenCalled();
    });

    it('should pass proper params to handler function', () => {
      cartReducer(initialState, clearFromCartAction);

      expect(clearFromCartMock)
        .toHaveBeenCalledWith(initialState.cartItems, clearFromCartAction.payload);
    });

    it('should change state of cart items', () => {
      expect(cartReducer(initialState, clearFromCartAction))
        .toEqual({ ...initialState, cartItems: finalValues });
    });
  });

  describe('CLEAR_CART', () => {
    it('should clear cart items', () => {
      const initialState = { ...state, cartItems: [{ id: 1 }, { id: 2 }, { id: 3 }] };

      expect(cartReducer(initialState, { type: CartTypes.CLEAR_CART })).toEqual(state);
    });
  });
});
