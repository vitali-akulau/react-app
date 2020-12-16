import { takeLatest } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import { onSignOutSuccess, clearCartOnSignOut } from './cart.sagas';
import * as Actions from './cart.actions';
import UserActionTypes from '../user/user.types';

describe('Redux: Cart Sagas', () => {
  describe('onSignOutSuccess', () => {
    const genObject = onSignOutSuccess();

    it('should wait for latest "SIGN_OUT_SUCCESS" action and call "clearCartOnSignOut"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut));
    });

    it('should be done on next iteration', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('clearCartOnSignOut', () => {
    it('should call "clearCart" action', async () => {
      const mockClearCart = jest.spyOn(Actions, 'clearCart');
      const dispatched = [];

      await runSaga({
        dispatch: (action) => dispatched.push(action),
      }, clearCartOnSignOut);

      expect(mockClearCart).toHaveBeenCalledTimes(1);
    });
  });
});
