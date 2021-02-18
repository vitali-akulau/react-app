const { getUniqueEmail, getUniqueName } = require('../data-providers');

class User {
  constructor({ email, name } = {}) {
    this.name = name || getUniqueName();
    this.email = email || getUniqueEmail();
  }
}

module.exports = User;
