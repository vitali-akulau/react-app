import { selectUser, selectCurrentUser } from './user.selectors';

describe('Redux: User Selectors', () => {
  const mockState = {
    user: {
      currentUser: {
        id: 127,
        displayName: 'Card Holder',
        email: 'some@email.com',
      },
    },
  };

  it('"selectUser" should return user', () => {
    expect(selectUser(mockState)).toEqual(mockState.user);
  });

  it('"selectCurrentUser" should return current user object if they are logged in', () => {
    expect(selectCurrentUser(mockState)).toEqual(mockState.user.currentUser);
  });
});
