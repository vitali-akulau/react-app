import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignUp = ({ signUpStart }) => {
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
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="confirm password"
          required
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </SignUpContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, password, displayName) => (
    dispatch(signUpStart({ email, password, displayName }))
  ),
});

export default connect(null, mapDispatchToProps)(SignUp);
