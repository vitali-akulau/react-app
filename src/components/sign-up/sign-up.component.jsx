import React from "react"
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils"

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { displayName, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert("Password doesn't match")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)

      await createUserProfileDocument(user, { displayName })
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
        <SignUpContainer>
          <SignUpTitle>Create account</SignUpTitle>
          <span>Or you can sign in if you have one</span>

          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={this.state.displayName}
              handleChange={this.handleChange}
              label="name"
              required
            />
            <FormInput
              type="email"
              name="email"
              value={this.state.email}
              handleChange={this.handleChange}
              label="email"
              required
            />
            <FormInput
              type="password"
              name="password"
              value={this.state.password}
              handleChange={this.handleChange}
              label="password"
              required
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              handleChange={this.handleChange}
              label="confirm password"
              required
            />
            <CustomButton type="submit">Sign Up</CustomButton>
          </form>
        </SignUpContainer>
  )
  }
}

export default SignUp
