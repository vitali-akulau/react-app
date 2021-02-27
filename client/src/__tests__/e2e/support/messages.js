const errorMessages = {
  wrongPassword: 'The password is invalid or the user does not have a password.',
  unregisteredEmail: 'There is no user record corresponding to this identifier. The user may have been deleted.',
  emptyRequiredField: 'Please fill out this field.',
  emailTaken: 'The email address is already in use by another account.',
  passwordsDoNotMatch: "Password doesn't match",
  tooShortPassword: 'Password should be at least 6 characters',
  emailNotContainingAt: (email) => `Please include an '@' in the email address. '${email}' is missing an '@'.`,
  failedPayment: 'Charge Error: Please check used payment card',
};

const notifications = {
  successfulPayment: 'Payment Successful',
};

module.exports = { errorMessages, notifications };
