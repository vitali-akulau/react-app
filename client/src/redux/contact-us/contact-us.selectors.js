import { createSelector } from 'reselect';

export const selectContactUs = (state) => state.contactUs;

export const selectContactUsHidden = createSelector(
  [selectContactUs],
  (contactUs) => contactUs.hidden,
);
