import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { ContactUsPopupContainer } from './contact-us-popup.styles';
import { toggleContactUsPopup } from '../../redux/contact-us/contact-us.actions';

export const ContactUsPopup = ({ toggleContactUsPopup }) => (
  <ContactUsPopupContainer>
    <CustomButton
      type="button"
      data-test="submit-feedback"
    >
      Submit
    </CustomButton>
    <CustomButton
      type="button"
      data-test="cancel-feedback"
    >
      Cancel
    </CustomButton>
  </ContactUsPopupContainer>
);

export const mapDispatchToProps = (dispatch) => ({
  toggleContactUsPopup: () => dispatch(toggleContactUsPopup()),
});

export default connect(null, mapDispatchToProps)(ContactUsPopup);
