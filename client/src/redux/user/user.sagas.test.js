import { runSaga } from 'redux-saga';
import { takeLatest, call } from 'redux-saga/effects';
import { User } from 'firebase';
import * as userSagas from './user.sagas';
import * as userActions from './user.actions';
import UserActionTypes from './user.types';

describe('Redux: User Sagas', () => {
  describe('"onGoogleSignInStart"', () => {
    const genObject = userSagas.onGoogleSignInStart();

    it('should take latest "GOOGLE_SIGN_IN_START" action and call "signInWithGoogle"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, userSagas.signInWithGoogle));
    });

    it('should be done on the next call', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('"onEmailSignInStart"', () => {
    const genObject = userSagas.onEmailSignInStart();

    it('should take latest "EMAIL_SIGN_IN_START" action and call "signInWithEmail"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, userSagas.signInWithEmail));
    });

    it('should be done on the next call', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('"onCheckCurrentUser"', () => {
    const genObject = userSagas.onCheckCurrentUser();

    it('should take latest "CHECK_USER_SESSION" action and call "isUserAuthenticated"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(UserActionTypes.CHECK_USER_SESSION, userSagas.isUserAuthenticated));
    });

    it('should be done on the next call', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('"onSignOutStart"', () => {
    const genObject = userSagas.onSignOutStart();

    it('should take latest "SIGN_OUT_START" action and call "signOut"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(UserActionTypes.SIGN_OUT_START, userSagas.signOut));
    });

    it('should be done on the next call', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('"onSignUpStart"', () => {
    const genObject = userSagas.onSignUpStart();

    it('should take latest "SIGN_UP_START" action and call "signUp"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(UserActionTypes.SIGN_UP_START, userSagas.signUp));
    });

    it('should be done on the next call', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });

  describe('"onSignUpSuccess"', () => {
    const genObject = userSagas.onSignUpSuccess();

    it('should take latest "SIGN_UP_SUCCESS" action and call "signInAfterSuccessfulSignUp"', () => {
      expect(genObject.next().value)
        .toEqual(takeLatest(UserActionTypes.SIGN_UP_SUCCESS,
          userSagas.signInAfterSuccessfulSignUp));
    });

    it('should be done on the next call', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });
});
