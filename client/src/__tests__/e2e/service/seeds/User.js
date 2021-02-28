const { getUniqueEmail, getUniqueName, getUniquePassword } = require('../data-providers');

class User {
  constructor({ email, name, password } = {}) {
    this.name = name || getUniqueName();
    this.email = email || getUniqueEmail();
    this.password = password || getUniquePassword();
  }
}

module.exports = User;
