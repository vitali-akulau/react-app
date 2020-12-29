import * as firebaseUtils from '../../../firebase/firebase.utils';

describe('Firebase Utils', () => {
  const firestoreDocMock = jest.spyOn(firebaseUtils.firestore, 'doc');
  const error = { message: 'some error' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserProfileDocument', () => {
    let userRef = {};
    const userAuth = {
      uid: 'a13d1ADD34rf',
      displayName: 'John Doe',
      email: 'johndoe@email.com',
    };
    const successGetExistingUser = jest.fn()
      .mockImplementation(async () => Promise.resolve({ exists: true }));
    const successGetNewUser = jest.fn()
      .mockImplementation(async () => Promise.resolve({ exists: false }));
    // const failureGet = jest.fn()
    //   .mockImplementation(async () => Promise.reject(error));
    const successSet = jest.fn()
      .mockImplementation(async () => Promise.resolve({}));
    const failureSet = jest.fn()
      .mockImplementation(async () => Promise.reject(error));

    it('should return if no "userAuth" is provided', async () => {
      userRef = { get: successGetExistingUser, set: successSet };
      firestoreDocMock.mockImplementation(() => (userRef));

      await firebaseUtils.createUserProfileDocument();

      expect(firestoreDocMock).not.toHaveBeenCalled();
    });

    it('should call firestore to get doc reference', async () => {
      userRef = { get: successGetExistingUser, set: successSet };
      firestoreDocMock.mockImplementation(() => (userRef));

      await firebaseUtils.createUserProfileDocument(userAuth);

      expect(firestoreDocMock).toHaveBeenCalledTimes(1);
    });

    it('should query proper doc reference path', async () => {
      userRef = { get: successGetExistingUser, set: successSet };
      firestoreDocMock.mockImplementation(() => (userRef));

      await firebaseUtils.createUserProfileDocument(userAuth);

      expect(firestoreDocMock).toHaveBeenCalledWith(`users/${userAuth.uid}`);
    });

    it('should return document reference', async () => {
      userRef = { get: successGetExistingUser, set: successSet };
      firestoreDocMock.mockImplementation(() => (userRef));

      const result = await firebaseUtils.createUserProfileDocument(userAuth);

      expect(JSON.stringify(result)).toEqual(JSON.stringify(userRef));
    });

    it('should make a call to set new user data', async () => {
      userRef = { get: successGetNewUser, set: successSet };
      firestoreDocMock.mockImplementation(() => (userRef));

      await firebaseUtils.createUserProfileDocument(userAuth);

      expect(userRef.set).toHaveBeenCalledTimes(1);
    });

    it('should pass proper data to a new user record', async () => {
      const dateMock = jest.spyOn(global, 'Date');
      const additionalData = { age: '30', size: 'M' };
      userRef = { get: successGetNewUser, set: successSet };
      firestoreDocMock.mockImplementation(() => (userRef));

      await firebaseUtils.createUserProfileDocument(userAuth, additionalData);

      const createdAtTime = dateMock.mock.instances[0];

      expect(userRef.set)
        .toHaveBeenCalledWith({
          displayName: userAuth.displayName,
          email: userAuth.email,
          uid: userAuth.uid,
          createdAt: createdAtTime,
          ...additionalData,
        });
    });

    it('should throw an error if new user data is not setup', async () => {
      const logMock = jest.spyOn(console, 'log');
      logMock.mockImplementation();

      userRef = { get: successGetNewUser, set: failureSet };
      firestoreDocMock.mockImplementation(() => (userRef));

      await expect(firebaseUtils.createUserProfileDocument(userAuth, {}))
        .rejects
        .toThrow();
    });
  });
});
