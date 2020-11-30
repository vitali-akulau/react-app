import userReducer from './user.reducer';
import UserActionTypes from './user.types';

describe('Redux: User Reducer', () => {
  const initialState = {
    currentUser: null,
    error: null,
  };
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
    it('should set a current user', () => {
      const state = { ...initialState };

      expect(userReducer(state, {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: currentUser,
      })).toEqual({ ...state, currentUser });
    });

    it('should reset an existing error', () => {
      const state = { ...initialState, error: 'error message' };

      expect(userReducer(state, {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: currentUser,
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
