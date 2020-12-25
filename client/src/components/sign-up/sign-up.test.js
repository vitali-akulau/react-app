import React from 'react';
import { shallow } from 'enzyme';
import { SignUp, mapDispatchToProps } from './sign-up.component';
import { signUpStart } from '../../redux/user/user.actions';

describe('Components: Sign Up', () => {
  describe('Sign Up', () => {
    const wrapper = shallow(<SignUp />);

    it('should render form title', () => {
      expect(wrapper.find('SignUpTitle').text()).toEqual('Create account');
    });

    it('should render "name" field', () => {
      expect(wrapper.find('FormInput[name="displayName"]')).toHaveLength(1);
    });

    it('should render "email" field', () => {
      expect(wrapper.find('FormInput[name="email"]')).toHaveLength(1);
    });

    it('should render "password" field', () => {
      expect(wrapper.find('FormInput[name="password"]')).toHaveLength(1);
    });

    it('should render "password" field', () => {
      expect(wrapper.find('FormInput[name="confirmPassword"]')).toHaveLength(1);
    });

    it('should render submit button', () => {
      expect(wrapper.find('CustomButton[type="submit"]').prop('children')).toEqual('Sign Up');
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch actions', () => {
      const dispatch = jest.fn();

      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ signUpStart }));
    });
  });
});
