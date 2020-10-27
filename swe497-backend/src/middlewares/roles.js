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
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
  student: {
    student: {
      "update:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
};

const ac = new AccessControl(grantsObject);

module.exports = ac;
