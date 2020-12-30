import * as userActions from '../../../../redux/user/user.actions';
import UserActionTypes from '../../../../redux/user/user.types';

describe('Redux: User Actions', () => {
  const error = 'error message';
  const user = { email: 'some@email.com', id: 'As09et12345' };
  const userCredentials = { email: 'some@email.com', password: 'secret12345' };

  it('"googleSignInStart" should create action to start sign in with Google', () => {
    expect(userActions.googleSignInStart())
      .toEqual({ type: UserActionTypes.GOOGLE_SIGN_IN_START });
  });

  it('"emailSignInStart" should create action to start sign in with email and password', () => {
    expect(userActions.emailSignInStart(userCredentials))
      .toEqual({ type: UserActionTypes.EMAIL_SIGN_IN_START, payload: userCredentials });
  });

  it('"signInSuccess" should create action to successful sign in', () => {
    expect(userActions.signInSuccess(user))
      .toEqual({ type: UserActionTypes.SIGN_IN_SUCCESS, payload: user });
  });

  it('"signInFailure" should create action to failed sign in', () => {
    expect(userActions.signInFailure(error))
      .toEqual({ type: UserActionTypes.SIGN_IN_FAILURE, payload: error });
  });

  it('"checkUserSession" should create action to check user session', () => {
    expect(userActions.checkUserSession())
      .toEqual({ type: UserActionTypes.CHECK_USER_SESSION });
  });

  it('"signOutStart" should create action to start sign out', () => {
    expect(userActions.signOutStart())
      .toEqual({ type: UserActionTypes.SIGN_OUT_START });
  });

  it('"signOutSuccess" should create action to successful sign out', () => {
    expect(userActions.signOutSuccess())
      .toEqual({ type: UserActionTypes.SIGN_OUT_SUCCESS });
  });

  it('"signOutFailure" should create action to failed sign out', () => {
    expect(userActions.signOutFailure(error))
      .toEqual({ type: UserActionTypes.SIGN_OUT_FAILURE, payload: error });
  });

  it('"signUpStart" should create action to sign up start', () => {
    expect(userActions.signUpStart(userCredentials))
      .toEqual({ type: UserActionTypes.SIGN_UP_START, payload: userCredentials });
  });

  it('"signUpSuccess" should create action to successful sign up', () => {
    const userData = { user, additionalData: { prop: 'value' } };

    expect(userActions.signUpSuccess(userData))
      .toEqual({ type: UserActionTypes.SIGN_UP_SUCCESS, payload: userData });
  });

  it('"signUpFailure" should create action to failed sign up', () => {
    expect(userActions.signUpFailure(error))
      .toEqual({ type: UserActionTypes.SIGN_UP_FAILURE, payload: error });
  });
});
