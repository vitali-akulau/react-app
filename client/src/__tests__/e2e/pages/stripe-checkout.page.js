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

  getStripeCheckoutFrame() {
    const iframe = $('[name="stripe_checkout_app"]');
    iframe.waitForDisplayed();
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
}

module.exports = new StripeCheckoutPage();
