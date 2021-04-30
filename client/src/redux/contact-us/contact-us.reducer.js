import ContactUsTypes from './contact-us.types';

const INITIAL_STATE = {
  hidden: true,
};

const contactUsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContactUsTypes.TOGGLE_CONTACT_US_POPUP:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default contactUsReducer;
