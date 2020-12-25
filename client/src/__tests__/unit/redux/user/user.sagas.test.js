import { runSaga } from 'redux-saga';
import { takeLatest, call } from 'redux-saga/effects';
import * as userSagas from '../../../../redux/user/user.sagas';
import * as userActions from '../../../../redux/user/user.actions';
import UserActionTypes from '../../../../redux/user/user.types';
import * as firebaseUtils from '../../../../firebase/firebase.utils';
import { signUpFailure } from '../../../../redux/user/user.actions';

jest.mock('../../../../firebase/firebase.utils');

describe('Redux: User Sagas', () => {
  describe('watchers', () => {
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

  describe('actions', () => {
    const snapshot = { id: 'GFav3152sDa6', data: { param: '112', param1: {} } };
    const authData = { user: { data: 'asd' } };
    const userCredentials = { email: 'email@mail.com', password: 'my_secret_password' };
    const additionalData = { displayName: 'John Doe' };
    const error = {
      message: 'some error',
    };
    const getUserSnapshotMock = jest.spyOn(firebaseUtils, 'getUserSnapshot');

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('"getSnapshotFromUserAuth"', () => {
      const auth = {
        portion: '1', of: '2', super: '3', complex: '4', data: '5',
      };

      it('should get user snapshot', () => {
        getUserSnapshotMock.mockImplementation(() => Promise.resolve(snapshot));
        const genObject = userSagas.getSnapshotFromUserAuth(auth, additionalData);

        expect(genObject.next().value)
          .toEqual(call(getUserSnapshotMock, auth, additionalData));
      });

      it('should put "success" action', async () => {
        const dispatched = [];
        getUserSnapshotMock.mockImplementation(() => Promise.resolve(snapshot));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.getSnapshotFromUserAuth, auth, additionalData).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInSuccess(snapshot));
      });

      it('should put "failure" action', async () => {
        const dispatched = [];
        getUserSnapshotMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.getSnapshotFromUserAuth, auth, additionalData).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInFailure(error));
      });
    });

    describe('"signInWithGoogle"', () => {
      const signInWithPopupMock = jest.spyOn(firebaseUtils.auth, 'signInWithPopup');

      it('should call google sign in with popup method', () => {
        const genObject = userSagas.signInWithGoogle();

        expect(genObject.next().value)
          .toEqual(call(signInWithPopupMock, firebaseUtils.googleProvider));
      });

      it('should put "success" action', async () => {
        const dispatched = [];
        signInWithPopupMock.mockImplementation(() => Promise.resolve(authData));
        getUserSnapshotMock.mockImplementation(() => Promise.resolve(snapshot));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signInWithGoogle).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInSuccess(snapshot));
      });

      it('should put "failure" action if sign in with pop up fails', async () => {
        const dispatched = [];
        signInWithPopupMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signInWithGoogle).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInFailure(error));
      });

      it('should put "failure" action if handling of auth data is unsuccessful', async () => {
        const dispatched = [];
        signInWithPopupMock.mockImplementation(() => Promise.resolve(authData));
        getUserSnapshotMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signInWithGoogle).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInFailure(error));
      });
    });

    describe('"signInWithEmail"', () => {
      const signInWithEmailAndPasswordMock = jest.spyOn(firebaseUtils.auth, 'signInWithEmailAndPassword');

      it('should call google sign in with email and password method', () => {
        const genObject = userSagas.signInWithEmail({ payload: userCredentials });

        expect(genObject.next().value)
          .toEqual(
            call(signInWithEmailAndPasswordMock, userCredentials.email, userCredentials.password),
          );
      });

      it('should put "success" action', async () => {
        const dispatched = [];
        signInWithEmailAndPasswordMock.mockImplementation(() => Promise.resolve(authData));
        getUserSnapshotMock.mockImplementation(() => Promise.resolve(snapshot));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signInWithEmail, { payload: userCredentials }).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInSuccess(snapshot));
      });

      it('should put "failure" action if sign in with email fails', async () => {
        const dispatched = [];
        signInWithEmailAndPasswordMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signInWithEmail, { payload: userCredentials }).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInFailure(error));
      });

      it('should put "failure" action if handling of auth data is unsuccessful', async () => {
        const dispatched = [];
        signInWithEmailAndPasswordMock.mockImplementation(() => Promise.resolve(authData));
        getUserSnapshotMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signInWithEmail, { payload: userCredentials }).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInFailure(error));
      });
    });

    describe('"isUserAuthenticated"', () => {
      const getCurrentUserMock = jest.spyOn(firebaseUtils, 'getCurrentUser');

      it('should check for current user presence', () => {
        const genObject = userSagas.isUserAuthenticated();

        expect(genObject.next().value).toEqual(call(getCurrentUserMock));
      });

      it('should NOT put action if there is not auth object', async () => {
        const dispatched = [];
        getCurrentUserMock.mockImplementation(() => Promise.resolve(null));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.isUserAuthenticated).toPromise();

        expect(dispatched[0]).toEqual(undefined);
      });

      it('should put "success" action', async () => {
        const dispatched = [];
        getCurrentUserMock.mockImplementation(() => Promise.resolve(authData));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.isUserAuthenticated).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInSuccess(authData));
      });

      it('should put "failure" action', async () => {
        const dispatched = [];
        getCurrentUserMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.isUserAuthenticated).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInFailure(error));
      });
    });

    describe('"signOut"', () => {
      const signOutMock = jest.spyOn(firebaseUtils.auth, 'signOut');

      it('should call google sign out', () => {
        const genObject = userSagas.signOut();

        expect(genObject.next().value).toEqual(call(signOutMock));
      });

      it('should put "success" action', async () => {
        const dispatched = [];
        signOutMock.mockImplementation(() => Promise.resolve());

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signOut).toPromise();

        expect(dispatched[0]).toEqual(userActions.signOutSuccess());
      });

      it('should put "failure" action', async () => {
        const dispatched = [];
        signOutMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signOut).toPromise();

        expect(dispatched[0]).toEqual(userActions.signOutFailure(error));
      });
    });

    describe('"signUp"', () => {
      const userData = { ...userCredentials, displayName: 'John Doe' };
      const createUserWithEmailAndPasswordMock = jest.spyOn(firebaseUtils.auth, 'createUserWithEmailAndPassword');

      it('should call google sign out', () => {
        const genObject = userSagas.signUp({ payload: userData });
        const { email, password } = userData;

        expect(genObject.next().value)
          .toEqual(call(createUserWithEmailAndPasswordMock, email, password));
      });

      it('should put "success" action', async () => {
        const dispatched = [];
        createUserWithEmailAndPasswordMock.mockImplementation(() => Promise.resolve(authData));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signUp, { payload: userData }).toPromise();

        expect(dispatched[0])
          .toEqual(
            userActions.signUpSuccess({
              user: authData.user,
              additionalData: { displayName: userData.displayName },
            }),
          );
      });

      it('should put "failure" action', async () => {
        const dispatched = [];
        createUserWithEmailAndPasswordMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signUp, { payload: userData }).toPromise();

        expect(dispatched[0]).toEqual(signUpFailure(error));
      });
    });

    describe('"signInAfterSuccessfulSignUp"', () => {
      it('should put "success" action', async () => {
        const dispatched = [];
        getUserSnapshotMock.mockImplementation(() => Promise.resolve(snapshot));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signInAfterSuccessfulSignUp,
        { payload: { authData, additionalData } }).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInSuccess(snapshot));
      });

      it('should put "failure" action', async () => {
        const dispatched = [];
        getUserSnapshotMock.mockImplementation(() => Promise.reject(error));

        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, userSagas.signInAfterSuccessfulSignUp,
        { payload: { authData, additionalData } }).toPromise();

        expect(dispatched[0]).toEqual(userActions.signInFailure(error));
      });
    });
  });
});
