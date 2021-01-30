import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { SigningPageContainer, ErrorContainer, SigningPageFormsContainer} from './signing.styles';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { selectError } from '../../redux/user/user.selectors';

export const SigningPage = ({ error }) => (
  <SigningPageContainer>
    {
      (error && error.message !== 'snapshot.data is not a function')
        ? <ErrorContainer data-test="signing-error">{error.message}</ErrorContainer>
        : null
    }
    <SigningPageFormsContainer>
      <SignIn />
      <SignUp />
    </SigningPageFormsContainer>
  </SigningPageContainer>
);

export const mapStateToProps = createStructuredSelector({
  error: selectError,
});

export default connect(mapStateToProps)(SigningPage);
