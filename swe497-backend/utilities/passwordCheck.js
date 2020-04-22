const bcrypt = require('bcryptjs');

module.exports = async function(
    userPassword,
    savedPassword
  ) {
    //arguments order important
    return await bcrypt.compare(userPassword, savedPassword);
  };