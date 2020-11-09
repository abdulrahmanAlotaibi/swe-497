const { APIError } = require("./error-handler");
const accessControl = require("../middlewares/roles");

module.exports = (resource, action) => {
  return (req, res, next) => {
    const permission = accessControl.can(req.user.role)[action](resource);

    console.log(permission.granted);

    if (permission.granted) {
      next();
    } else {
      throw APIError.unAuthorized();
    }
  };
};
