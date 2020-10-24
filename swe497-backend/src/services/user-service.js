const User = require("../models/User");
const APIError = require("../util/errorHandler");
exports.signIn = async (email, password) => {
  let user = await User.findOne({ email });

  if (!user) {
    throw new APIError.badRequest();
  }

  // Compare a plain text password with an encrypted password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new APIError.badRequest();
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(
    payload,
    config.get("jwtSecret"),
    {
      expiresIn: 360000,
    },
    (err, token) => {
      if (err) {
        throw new Error(err);
      }
    }
  );

  return token;
};
