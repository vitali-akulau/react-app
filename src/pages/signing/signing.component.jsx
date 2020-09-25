import React from "react";
import "./signing.styles.scss"
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SigningPage = () => {
  return (
    <div className='signing'>
      <h2>SIGN PAGE</h2>
      <SignIn />
      <SignUp />
    </div>
  )
}

export default SigningPage
