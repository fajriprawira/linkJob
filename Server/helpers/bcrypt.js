const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const saltRounds = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

const comparePassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
  
}

module.exports = {
  hashPassword,
  comparePassword,
};
