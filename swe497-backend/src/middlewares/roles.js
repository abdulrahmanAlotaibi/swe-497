const AccessControl = require("accesscontrol");

let grantsObject = {
  admin: {
    course: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    user: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  tutor: {
    course: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
    tutor: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
  student: {
    student: {
      "read:own": ["*"],
      "update:own": ["*"],
    },
    cart: {
      "read:own": ["*"],
      "update:own": ["*"],
    },
  },
};

const ac = new AccessControl(grantsObject);

module.exports = ac;
