const BasePage = require('./basepage.page');

class StripeCheckoutPage extends BasePage {
  get paymentForm() {
    return $('.Modal-form');
  }

  get closePaymentFormButton() {
    return $('.Header-navClose');
  }

  get purchaseDescriptionHeader() {
    return $('.Header-purchaseDescription');
  }

  get emailField() {
    return $('[type="email"]');
  }

  get nameField() {
    return $('[placeholder="Name"]');
  }

  get streetField() {
    return $('[placeholder="Street"]');
  }

  get postalCodeField() {
    return $('[placeholder="ZIP Code"]');
  }

  get cityField() {
    return $('[placeholder="City"]');
  }

  get countrySelect() {
    return $('select.Select-control');
  }

  get billingAddressForm() {
    return $('.Addresses-object.is-billing');
  }

  get billingAddressNameField() {
    return this.billingAddressForm.$('[placeholder="Name"]');
  }

  get billingAddressStreetField() {
    return this.billingAddressForm.$('[placeholder="Street"]');
  }

  get billingAddressPostalCodeField() {
    return this.billingAddressForm.$('[placeholder="ZIP Code"]');
  }

  get billingAddressCityField() {
    return this.billingAddressForm.$('[placeholder="City"]');
  }

  get billingAddressCountrySelect() {
    return this.billingAddressForm.$('select.Select-control');
  }

  get proceedToCardInfoButton() {
    return $('.Section-button').$('[type="submit"]');
  }

  get cardNumberField() {
    return $('[placeholder="Card number"]');
  }

  get cardExpirationDateField() {
    return $('[placeholder="MM / YY"]');
  }

  get cvcField() {
    return $('[placeholder="CVC"]');
  }

  get submitPaymentButton() {
    return $('[type="submit"]');
  }

  get backButton() {
    return $('.Header-navBack');
  }

  get sameShippingAndBillingCheckbox() {
    return $('label=Same billing & shipping info');
  }

  get billingAddressButton() {
    return $('.SegmentedControl-Item=Billing');
  }

  getStripeCheckoutFrame() {
    const iframe = $('[name="stripe_checkout_app"]');
    iframe.waitForExist();
    return iframe;
  }

  closePaymentForm() {
    this.closePaymentFormButton.waitForDisplayed();
    this.closePaymentFormButton.click();
  }

  getPaymentFormTotal() {
    this.purchaseDescriptionHeader.waitForDisplayed();
    const headerText = this.purchaseDescriptionHeader.getText();
    return Number.parseInt(headerText.match(/\d+/)[0], 10);
  }

  selectCountry(countryAbbreviation) {
    this.countrySelect.selectByAttribute('value', countryAbbreviation);
  }

  selectBillingCountry(countryAbbreviation) {
    this.billingAddressCountrySelect.selectByAttribute('value', countryAbbreviation);
  }

  getInvalidInputValue() {
    const inputWrapper = $('.is-invalid');
    inputWrapper.waitForDisplayed();

    return inputWrapper.$('input').getValue();
  }

  enterPersonalData(userData) {
    this.selectCountry(userData.country);
    this.emailField.setValue(userData.email);
    this.nameField.setValue(userData.name);
    this.streetField.setValue(userData.line1);
    this.postalCodeField.setValue(userData.zip);
    this.cityField.setValue(userData.city);
    if (userData.billingAddress) {
      this.billingAddressButton.click();
      this.billingAddressForm.waitForDisplayed();
      this.selectBillingCountry(userData.country);
      this.billingAddressNameField.setValue(userData.billingAddress.name);
      this.billingAddressStreetField.setValue(userData.billingAddress.line1);
      this.billingAddressPostalCodeField.setValue(userData.billingAddress.zip);
      this.billingAddressCityField.setValue(userData.billingAddress.city);
    }
    this.proceedToCardInfoButton.click();
  }

  enterCardData(userData) {
    this.cardNumberField.setValue(userData.number);
    this.cardExpirationDateField.setValue(userData.expDate);
    this.cvcField.setValue(userData.cvv);
    this.submitPaymentButton.click();
  }

  getPaymentOperationResultMessage() {
    browser.waitUntil(() => browser.isAlertOpen());
    return browser.getAlertText();
  }

  returnToPersonalForm() {
    this.backButton.click();
  }

  toggleAddressesCheckbox() {
    this.sameShippingAndBillingCheckbox.waitForDisplayed();
    this.sameShippingAndBillingCheckbox.click();
    this.billingAddressButton.waitForDisplayed();
  }
}

module.exports = new StripeCheckoutPage();
