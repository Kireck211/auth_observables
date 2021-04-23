const users = [];

const isValid = (auth_token) => true;

const login = (user) => users.push(user);

module.exports = {
  users,
  isValid,
  login
}