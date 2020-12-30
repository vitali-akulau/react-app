import { setCurrentUser } from '../../../../redux/user/user.utils';

describe('Redux: User Utils', () => {
  const userData = {
    email: 'some@email.com', portion: '1', of: '2', data: '3',
  };
  const snapshot = { id: 'aT123saxc4', data() { return userData; } };
  const currentUser = { id: 'aT123saxc4', email: 'some@email.com' };

  it('should return object', () => {
    expect(setCurrentUser(snapshot)).toBeObject();
  });

  it('should set user id', () => {
    expect(setCurrentUser(snapshot)).toContainEntry(['id', currentUser.id]);
  });

  it('should spread other user data', () => {
    expect(setCurrentUser(snapshot)).toContainKeys(Object.keys(userData));
  });
});
