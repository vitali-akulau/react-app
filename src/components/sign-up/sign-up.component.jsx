import React from "react"
import "./sign-up.styles.scss"

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils"

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    return (
        <div className='sign-up'>
          <h2>Create account</h2>
          <span>Or you can sign in if you have one</span>

          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="text"
              name="name"
              value={this.state.name}
              handleChange={this.handleChange}
              label="name"
              required
            />
            <FormInput
              type="email"
              name="name"
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
          </form>
          <CustomButton type="submit">Sign Up</CustomButton>
        </div>
  )
  }
}

export default SignUp