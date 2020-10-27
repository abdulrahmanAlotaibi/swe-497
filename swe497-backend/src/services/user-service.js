const User = require("../models/User");
const {APIError} = require("../middlewares/error-handler");

exports.signIn = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      throw APIError.badRequest();
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
          throw new APIError(err);
        }
      }
    );

    return token;
  } catch (err) {
    throw new APIError();
  }
};

exports.signUp = async (name, email, password, confirmPassword) => {
  try {
    let user = await User.findOne({ email });

    // Check if the user exsist
    if (user) {
      throw APIError.alreadyExsist();
    }

    user = new User({
      name,
      email,
      password,
      confirmPassword,
    });

    // Salt algorithim to encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user.confirmPassword = user.password;

    const newUser = await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    // Send back the token
    const token = jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );

    return { ...newUser, token };
  } catch (err) {
    throw new APIError();
  }
};
