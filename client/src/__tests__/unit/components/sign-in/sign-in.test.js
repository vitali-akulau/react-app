import React from 'react';
import { shallow, mount } from 'enzyme';
import { SignIn, mapDispatchToProps, mapStateToProps } from '../../../../components/sign-in/sign-in.component';
import { googleSignInStart, emailSignInStart } from '../../../../redux/user/user.actions';
import getMockedState from '../../../utils/mock-state-provider';

describe('Components: Sign In', () => {
  describe('Sign In', () => {
    const wrapper = shallow(<SignIn />);

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render "email" field', () => {
      expect(wrapper.find('FormInput[name="email"]')).toHaveLength(1);
    });

    it('should render "password" field', () => {
      expect(wrapper.find('FormInput[name="password"]')).toHaveLength(1);
    });

    it('should render form title', () => {
      expect(wrapper.find('SignInTitle').text()).toEqual('I already have an account');
    });

    it('should render submit button', () => {
      expect(wrapper.find('CustomButton[type="submit"]').prop('children')).toEqual('Sign In');
    });

    it('should render "Sign in with Google" button', () => {
      expect(wrapper.find('CustomButton[type="button"]').prop('children')).toEqual('Sign In with Google');
    });

    it('should be able to trigger sign in', () => {
      const emailSignInStartMock = jest.fn();
      const mountedWrapper = mount(<SignIn emailSignInStart={emailSignInStartMock} />);

      mountedWrapper.find('form').simulate('submit', { preventDefault() {} });
      expect(emailSignInStartMock).toHaveBeenCalledTimes(1);
    });

    it('should be able to trigger "Sign in with Google"', () => {
      const googleSignInStartMock = jest.fn();
      wrapper.setProps({ googleSignInStart: googleSignInStartMock });

      wrapper.find('CustomButton[type="button"]').prop('onClick')();
      expect(googleSignInStartMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapStateToProps', () => {
    it('should map state to props', () => {
      const initialState = getMockedState(['user']);

      expect(mapStateToProps(initialState)).toContainEntry(['error', initialState.user.error]);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn();

      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ emailSignInStart, googleSignInStart }));
    });
  });
});
