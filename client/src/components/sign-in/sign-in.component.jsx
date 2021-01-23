import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SignInContainer, SignInTitle, SignInButtonsContainer, ErrorContainer } from './sign-in.styles';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { selectError } from '../../redux/user/user.selectors';

export const SignIn = ({ googleSignInStart, emailSignInStart, error }) => {
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const { email, password } = userCredentials;

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ((!email || email === ' ') || (!password || password === ' ')) {
      return null;
    }

    emailSignInStart(email, password);
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          label="email"
          handleChange={handleChange}
          required
          data-test="sign-in-email"
        />
        <FormInput
          name="password"
          type="password"
          label="password"
          value={password}
          handleChange={handleChange}
          required
          data-test="sign-in-password"
        />
        <SignInButtonsContainer>
          <CustomButton
            type="submit"
            data-test="sign-in-submit"
          >
            Sign In
          </CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
            data-test="google-sign-in"
          >
            Sign In with Google
          </CustomButton>
        </SignInButtonsContainer>
      </form>
      {
        error
          ? <ErrorContainer data-test="sign-in-error">{error.message}</ErrorContainer>
          : null
      }
    </SignInContainer>
  );
};

export const mapStateToProps = createStructuredSelector({
  error: selectError,
});

export const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
