const { check, param, body } = require("express-validator");

/**
 * This files represents the validation process
 */

exports.signUp = [
  check("name", "Name is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("email", "Email is not valid").isEmail(),
  check("password", "Password is not valid")
    .trim()
    .isLength({ min: 7 }),
  check("confirmPassword", "Passwords must be equal").custom(
    (value, { req }) => value === req.body.password
  ),
  check("confirmPassword", "Confirm Password is not valid")
    .trim()
    .isLength({ min: 7 }),
];

exports.signIn = [
  check("email", "Email is not valid").isEmail(),
  check("password", "Password is not valid")
    .not()
    .isEmpty({ ignore_whitespace: true })
    .isLength({ min: 7 }),
];

exports.courseForm = [
  check("title", "Title is not valid")
    .isString()
    .isEmpty({ ignore_whitespace: true }),
  check("description", "Description is not valid")
    .isString()
    .isEmpty({ ignore_whitespace: true }),
  check("author", "Author is not valid")
    .isMongoId()
    .isEmpty({ ignore_whitespace: true }),
  check("mainCategory", "Main category is not valid").isString({
    ignore_whitespace: true,
  }),
  check("subCategory", "Sub category is not valid").isString({
    ignore_whitespace: true,
  }),

  check("tags", "Tags is not valid").isString({
    ignore_whitespace: true,
  }),

  check("price", "Price is not valid").exists(),
];
