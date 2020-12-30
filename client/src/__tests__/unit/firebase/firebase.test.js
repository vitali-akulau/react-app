import * as firebaseUtils from '../../../firebase/firebase.utils';

describe('Firebase Utils', () => {
  const firestoreDocMock = jest.spyOn(firebaseUtils.firestore, 'doc');
  const error = { message: 'some error' };
  const additionalData = { age: '30', size: 'M' };
  const collectionsSnapshot = {
    docs: [
      {
        id: 1,
        data: jest.fn().mockImplementation(() => ({ title: 'jeans', items: [{ id: 'a1qw' }, { id: 'qe4r' }] })),
      },
      {
        id: 2,
        data: jest.fn().mockImplementation(() => ({ title: 'jackets', items: [{ id: 'a2qw' }, { id: 'qe5r' }] })),
      },
      {
        id: 3,
        data: jest.fn().mockImplementation(() => ({ title: 'boots', items: [{ id: 'a3qw' }, { id: 'qe6r' }] })),
      },
    ],
  };

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

  describe('getCurrentUser', () => {
    const userAuth = {
      uid: 'a13d1ADD34rf',
      displayName: 'John Doe',
      email: 'johndoe@email.com',
    };
    const onAuthStateChangedMock = jest.spyOn(firebaseUtils.auth, 'onAuthStateChanged');

    it('should call "onAuthStateChangedMock" listener', () => {
      onAuthStateChangedMock.mockImplementation(() => userAuth);

      firebaseUtils.getCurrentUser();

      expect(onAuthStateChangedMock).toHaveBeenCalledTimes(1);
    });

    it('should return "userAuth" object if it is successful', () => {
      onAuthStateChangedMock.mockImplementation(() => userAuth);

      expect(firebaseUtils.getCurrentUser()).resolves.toEqual(userAuth);
    });

    it('should return error if it is failed', () => {
      onAuthStateChangedMock.mockImplementation(() => new Error(error.message));

      expect(firebaseUtils.getCurrentUser()).rejects.toEqual(error.message);
    });
  });

  describe('convertCollectionsSnapshotToMap', () => {
    it('should call "map" to transform snapshot data', () => {
      const reduceSpy = jest.spyOn(Array.prototype, 'map');

      firebaseUtils.convertCollectionsSnapshotToMap(collectionsSnapshot);

      expect(reduceSpy).toHaveBeenCalledTimes(1);
    });

    it('should call "reduce" to compose final collections object', () => {
      const reduceSpy = jest.spyOn(Array.prototype, 'reduce');

      firebaseUtils.convertCollectionsSnapshotToMap(collectionsSnapshot);

      expect(reduceSpy).toHaveBeenCalledTimes(1);
    });

    it('should transform collections', () => {
      const collectionsMap = {
        boots: {
          id: 3, items: [{ id: 'a3qw' }, { id: 'qe6r' }], routeName: 'boots', title: 'boots',
        },
        jackets: {
          id: 2, items: [{ id: 'a2qw' }, { id: 'qe5r' }], routeName: 'jackets', title: 'jackets',
        },
        jeans: {
          id: 1, items: [{ id: 'a1qw' }, { id: 'qe4r' }], routeName: 'jeans', title: 'jeans',
        },
      };

      expect(firebaseUtils.convertCollectionsSnapshotToMap(collectionsSnapshot))
        .toEqual(collectionsMap);
    });
  });

  describe('getCollectionSnapshot', () => {
    const collectionPath = 'collections';
    const firestoreCollectionMock = jest.spyOn(firebaseUtils.firestore, 'collection');

    it('should call firestore to get collection reference', async () => {
      firestoreCollectionMock.mockImplementation(() => (
        {
          get: jest.fn().mockImplementation(async () => Promise.resolve(collectionsSnapshot)),
        }
      ));

      await firebaseUtils.getCollectionSnapshot(collectionPath);

      expect(firestoreCollectionMock).toHaveBeenCalledTimes(1);
    });

    it('should call firestore with proper path', async () => {
      firestoreCollectionMock.mockImplementation(() => (
        {
          get: jest.fn().mockImplementation(async () => Promise.resolve(collectionsSnapshot)),
        }
      ));

      await firebaseUtils.getCollectionSnapshot(collectionPath);

      expect(firestoreCollectionMock).toHaveBeenCalledWith(collectionPath);
    });

    it('should return collections snapshot', async () => {
      firestoreCollectionMock.mockImplementation(() => (
        {
          get: jest.fn().mockImplementation(async () => Promise.resolve(collectionsSnapshot)),
        }
      ));

      await expect(firebaseUtils.getCollectionSnapshot(collectionPath))
        .resolves
        .toEqual(collectionsSnapshot);
    });

    it('should return error if it can\'t get collections snapshot', async () => {
      firestoreCollectionMock.mockImplementation(() => (
        {
          get: jest.fn().mockImplementation(async () => Promise.reject(error)),
        }
      ));

      await expect(firebaseUtils.getCollectionSnapshot(collectionPath))
        .rejects
        .toEqual(error);
    });
  });
});
