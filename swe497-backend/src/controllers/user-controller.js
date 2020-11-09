const userService = require("../services/user-service");

exports.signup = async (req, res) => {
  let userData = ({ name, email, password, confirmPassword, role } = req.body);

  if (userData.role === "student") {
    const studentData = ({ educationLevel, studyAt } = req.body);
    userData = { ...userData, ...studentData };
  } else if (userData.role === "tutor") {
    const tutorData = ({ phone, qualifications, country, city } = req.body);
    userData = { ...userData, ...tutorData };
  }

  const user = await userService.signUp(userData);

  res.status(200).json({
    status: "success",
    data: { user },
  });
};
