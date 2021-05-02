import React, { useState } from 'react';

import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { FormDropdown } from '../form-dropdown/form-dropdown.component';
import {
  ContactUsPopupContainer,
  ContactUsFormContainer,
  ContactUsTitle,
  ContactUsFormWrapper,
  ContactUsPopupWrapper,
  ContactUsButtonsContainer,
} from './contact-us-popup.styles';
import { toggleContactUsPopup } from '../../redux/contact-us/contact-us.actions';
import FormInput from '../form-input/form-input.component';
import FormTextarea from '../form-textarea/form-textarea.component';

export const ContactUsPopup = ({ toggleContactUsPopup }) => {
  const locationOptions = [
    {
      id: 0,
      title: 'New York',
      selected: false,
      key: 'location',
    },
    {
      id: 1,
      title: 'Dublin',
      selected: false,
      key: 'location',
    },
    {
      id: 2,
      title: 'California',
      selected: false,
      key: 'location',
    },
    {
      id: 3,
      title: 'Izmir',
      selected: false,
      key: 'location',
    },
    {
      id: 4,
      title: 'Oslo',
      selected: false,
      key: 'location',
    },
  ];

  const surveyOptions = [
    {
      id: 0,
      title: 'Customer Service',
      selected: false,
      key: 'location',
    },
    {
      id: 1,
      title: 'Discounts and Promotions',
      selected: false,
      key: 'location',
    },
    {
      id: 2,
      title: 'Products Quality',
      selected: false,
      key: 'location',
    },
    {
      id: 3,
      title: 'Order Delivery',
      selected: false,
      key: 'location',
    },
    {
      id: 4,
      title: 'Purchase Returns',
      selected: false,
      key: 'location',
    },
    {
      id: 5,
      title: 'Improvements Request',
      selected: false,
      key: 'location',
    },
  ];

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
    <ContactUsPopupWrapper>


    <ContactUsPopupContainer>
      <ContactUsFormContainer>
        <ContactUsFormWrapper>
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
            <FormDropdown
              dropdownTitle="Select Your Location"
              options={locationOptions}
            />
            <FormDropdown
              dropdownTitle="Reasons"
              options={surveyOptions}
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
            <ContactUsButtonsContainer>
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
            </ContactUsButtonsContainer>
          </form>
        </ContactUsFormWrapper>
      </ContactUsFormContainer>
    </ContactUsPopupContainer>
    </ContactUsPopupWrapper>
  );
};

export const mapDispatchToProps = (dispatch) => ({
  toggleContactUsPopup: () => dispatch(toggleContactUsPopup()),
});

export default connect(null, mapDispatchToProps)(ContactUsPopup);
