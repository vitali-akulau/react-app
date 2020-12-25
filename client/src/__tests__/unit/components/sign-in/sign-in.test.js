import React from 'react';
import { shallow } from 'enzyme';
import { SignIn, mapDispatchToProps } from '../../../../components/sign-in/sign-in.component';
import { googleSignInStart, emailSignInStart } from '../../../../redux/user/user.actions';

describe('Components: Sign In', () => {
  describe('Sign In', () => {
    const wrapper = shallow(<SignIn />);

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
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn();

      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ emailSignInStart, googleSignInStart }));
    });
  });
});
