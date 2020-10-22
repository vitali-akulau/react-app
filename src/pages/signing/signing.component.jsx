import React from 'react';
import SigningPageContainer from './signing.styles';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SigningPage = () => (
  <SigningPageContainer>
    <SignIn />
    <SignUp />
  </SigningPageContainer>
);

export default SigningPage;
