const { check, param, body } = require("express-validator");

/**
 * This files represents the validation process
 */

exports.createRoadmap = [
  check("title", "title is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("description", "description is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("tags", "tags is required").not().isEmpty({ ignore_whitespace: true }),
];

exports.getRoadmap = [
  param("roadmapId", "roadmap id is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
];

exports.getPath = [
  param("pathId", "path id is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
];

exports.deletePath = [
  param("pathId", "path id is required")
    .isString()
    .not()
    .isEmpty({ ignore_whitespace: true }),
  param("roadmapId", "roadmap id is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
];

exports.createPath = [
  check("title", "title is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("description", "description is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
  check("links", "links are not valid").exists({
    checkFalsy: true,
  }),
  check("roadmapId", "roadmap id is required")
    .not()
    .isEmpty({ ignore_whitespace: true }),
];

exports.signUp = [
  check("name", "Name is required").not().isEmpty({ ignore_whitespace: true }),
  check("email", "Email is not valid").isEmail(),
  check("password", "Password is not valid").trim().isLength({ min: 7 }),
  check("confirmPassword", "Passwords must be equal").custom(
    (value, { req }) => value === req.body.password
  ),
  check("confirmPassword", "COnfirm Password is not valid")
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
exports.updatePath = [];
