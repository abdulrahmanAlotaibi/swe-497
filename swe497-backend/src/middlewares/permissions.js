const { APIError } = require("./error-handler");
const ac = require("../middlewares/roles");
module.exports = (resource, action) => {
  return (req, res, next) => {
    const permission = ac.can(req.user.role)[action](resource);

    console.log(permission.granted);

    if (permission.granted) {
      next();
    } else {
      throw APIError.unAuthorized();
    }
  };
};
