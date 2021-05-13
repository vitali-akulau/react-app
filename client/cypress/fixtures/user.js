class User {
  constructor(name, email, password, confirmPassword) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  createUser(name, email, password, confirmPassword) {
    return new User(name, email, password, confirmPassword);
  }
}

export default new User();
