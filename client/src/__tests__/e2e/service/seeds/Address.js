const _ = require('lodash');
const validAddresses = require('../../fixtures/valid-addresses');
const { getValidRandomPhoneNumber } = require('../data-providers');

class Address {
  constructor({
    line1, city, state, zip, phone, country,
  } = {}) {
    const randomAddress = _.sample(validAddresses);

    this.line1 = line1 || randomAddress.line1;
    this.city = city || randomAddress.city;
    this.state = state || randomAddress.state;
    this.zip = zip || randomAddress.zip;
    this.phone = phone || getValidRandomPhoneNumber();
    this.country = country || 'US';
  }
}

module.exports = Address;
