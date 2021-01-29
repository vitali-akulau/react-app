import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { createStructuredSelector } from 'reselect';
import { selectError } from '../../redux/user/user.selectors';
import { ErrorContainer } from '../sign-in/sign-in.styles';

export const SignUp = ({ signUpStart, error }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {
    displayName, email, password, confirmPassword,
  } = userCredentials;

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }

    if (
      (!email || email === ' ')
      || (!displayName || displayName === ' ')
      || (!password || password === ' ')
      || (!confirmPassword || confirmPassword === ' ')
    ) {
      return null;
    }

    signUpStart(email, password, displayName);
  };

  return (
    <SignUpContainer>
      <SignUpTitle>Create account</SignUpTitle>
      <span>Or you can sign in if you have one</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="name"
          required
          data-test="sign-up-name"
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
          data-test="sign-up-email"
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
          data-test="sign-up-password"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="confirm password"
          required
          data-test="sign-up-confirm-password"
        />
        <CustomButton
          type="submit"
          data-test="sign-up-submit"
        >
          Sign Up
        </CustomButton>
      </form>
      {
        error
          ? <ErrorContainer data-test="sign-up-error">{error.message}</ErrorContainer>
          : null
      }
    </SignUpContainer>
  );
};

export const mapStateToProps = createStructuredSelector({
  error: selectError,
});

export const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, password, displayName) => (
    dispatch(signUpStart({ email, password, displayName }))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
