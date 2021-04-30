import React, {useState} from 'react';

import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { ContactUsPopupContainer, ContactUsFormContainer, ContactUsTitle } from './contact-us-popup.styles';
import { toggleContactUsPopup } from '../../redux/contact-us/contact-us.actions';
import FormInput from '../form-input/form-input.component';
import FormTextarea from '../form-textarea/form-textarea.component';
import { SignInButtonsContainer } from '../sign-in/sign-in.styles';

export const ContactUsPopup = ({ toggleContactUsPopup }) => {
  const [userFeedback, setUserFeedback] = useState({ email: '', phone: '', message: '' });
  const { email, phone, message } = userFeedback;

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserFeedback({ ...userFeedback, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ((!email || email === ' ') || (!phone || phone === ' ') || (!message || message === ' ')) {
      return null;
    }

    toggleContactUsPopup();
  };

  return (
    <ContactUsPopupContainer>
      <ContactUsFormContainer>
        <ContactUsTitle>This is where you can leave your feedback</ContactUsTitle>
        <span>Any...</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="email"
            value={email}
            handleChange={handleChange}
            required
            data-test="feedback-email"
          />
          <FormInput
            name="phone"
            type="tel"
            label="phone"
            value={phone}
            handleChange={handleChange}
            required
            data-test="feedback-phone"
          />
          <FormTextarea
            name="message"
            label="message"
            value={message}
            rows="5"
            handleChange={handleChange}
            required
            data-test="feedback-message"
          />
          <SignInButtonsContainer>
            <CustomButton
              type="submit"
              data-test="submit-feedback"
            >
              Submit
            </CustomButton>
            <CustomButton
              type="button"
              data-test="cancel-feedback"
              onClick={toggleContactUsPopup}
            >
              Cancel
            </CustomButton>
          </SignInButtonsContainer>
        </form>
      </ContactUsFormContainer>
    </ContactUsPopupContainer>
  );
};

export const mapDispatchToProps = (dispatch) => ({
  toggleContactUsPopup: () => dispatch(toggleContactUsPopup()),
});

export default connect(null, mapDispatchToProps)(ContactUsPopup);
