import React from 'react';
import { mount, shallow } from 'enzyme';
import { SignUp, mapDispatchToProps } from '../../../../components/sign-up/sign-up.component';
import { signUpStart } from '../../../../redux/user/user.actions';

describe('Components: Sign Up', () => {
  describe('Sign Up', () => {
    const wrapper = shallow(<SignUp />);

    afterEach(() => {
      jest.clearAllMocks();
    });

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

    it('should be able to trigger sign up', () => {
      const signUpStartMock = jest.fn();
      const mountedWrapper = mount(<SignUp signUpStart={signUpStartMock} />);

      mountedWrapper.find('form').simulate('submit', { preventDefault() {} });
      expect(signUpStartMock).toHaveBeenCalledTimes(1);
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
