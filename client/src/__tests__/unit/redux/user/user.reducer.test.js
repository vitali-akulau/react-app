import userReducer from '../../../../redux/user/user.reducer';
import UserActionTypes from '../../../../redux/user/user.types';
import * as userUtils from '../../../../redux/user/user.utils';

describe('Redux: User Reducer', () => {
  const initialState = {
    currentUser: null,
    error: null,
  };
  const snapshot = { id: 'aT123saxc4', data() { return { moreData: [] }; } };
  const currentUser = { id: 'aT123saxc4', email: 'some@email.com' };
  const error = 'error message';

  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state if unrecognized action provided', () => {
    const unrecognizedAction = { type: 'DO_SOMETHING', payload: 'payload' };

    expect(userReducer(undefined, unrecognizedAction)).toEqual(initialState);
  });

  describe('SIGN_IN_SUCCESS', () => {
    const setCurrentUserMock = jest.spyOn(userUtils, 'setCurrentUser');
    setCurrentUserMock.mockImplementation(() => currentUser);

    it('should call data handler', () => {
      const state = { ...initialState };

      userReducer(state, {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: snapshot,
      });

      expect(setCurrentUserMock).toHaveBeenCalledTimes(1);
    });

    it('should pass proper data to handler', () => {
      const state = { ...initialState };

      userReducer(state, {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: snapshot,
      });

      expect(setCurrentUserMock).toHaveBeenCalledWith(snapshot);
    });

    it('should set a current user', () => {
      const state = { ...initialState };

      expect(userReducer(state, {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: snapshot,
      })).toEqual({ ...state, currentUser });
    });

    it('should reset an existing error', () => {
      const state = { ...initialState, error: 'error message' };

      expect(userReducer(state, {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: snapshot,
      })).toEqual({ ...state, currentUser, error: null });
    });
  });

  ['SIGN_OUT_SUCCESS', 'SIGN_UP_SUCCESS'].forEach((actionType) => {
    describe(actionType, () => {
      it('should reset a current user', () => {
        const state = { ...initialState, currentUser };

        expect(userReducer(state, {
          type: actionType,
        })).toEqual(initialState);
      });

      it('should reset an existing error', () => {
        const state = { ...initialState, currentUser, error: 'error message' };

        expect(userReducer(state, {
          type: actionType,
        })).toEqual(initialState);
      });
    });
  });

  ['SIGN_IN_FAILURE', 'SIGN_OUT_FAILURE', 'SIGN_UP_FAILURE'].forEach((actionType) => {
    describe(actionType, () => {
      it('should store an error', () => {
        const state = { ...initialState };

        expect(userReducer(state, {
          type: actionType,
          payload: error,
        })).toEqual({ ...state, error });
      });

      it('should rewrite an existing error', () => {
        const state = { ...initialState, error: 'previous call error' };

        expect(userReducer(state, {
          type: actionType,
          payload: error,
        })).toEqual({ ...state, error });
      });
    });
  });
});
