const Course = require("../model/course");
const Tutor = require("../model/tutor");

exports.search = async (type, query) => {
  if (type === "course") {
    return await searchByCourseName(query);
  }
  if (type === "tutor") {
    return await searchByTutorName(query);
  }
  if (type === "city") {
    return await searchByCityName(query);
  }
  if (type === "institution") {
    return await searchByInstitutionName(query);
  }
  if (type === "topic") {
    return await searchByTopic(query);
  }
};

const searchByTopic = async query => {
  try {
    const courses = await Course.find({
      type: "topic",
      name: {
        $regex: new RegExp(query)
      }
    });
    return courses;
  } catch (e) {
    return "something went wrong";
  }
};
const searchByCourseName = async query => {
  try {
    return await Course.find({
      type: "course",
      name: {
        $regex: new RegExp(query)
      }
    });
  } catch (err) {
    return "something went wrong";
  }
};

const searchByTutorName = async query => {
  try {
    const tutors = await Tutor.find({
      name: {
        $regex: new RegExp(query)
      }
    });
    let courses = [];
    for (const tutor of tutors) {
      courses = [...(await Course.find({ type: "course", tutor: tutor._id }))];
    }
    return courses;
    // return await Course.find({ tutor: tutor._id });
  } catch (err) {
    return "Something went wrong";
  }
};

const searchByCityName = async query => {
  try {
    const tutors = await Tutor.find({
      city: {
        $regex: new RegExp(query)
      }
    });
    let courses = [];
    for (const tutor of tutors) {
      courses = [...(await Course.find({ type: "course", tutor: tutor._id }))];
    }
    return courses;
    // return await Course.find({ tutor: tutor._id });
  } catch (err) {
    return "Something went wrong";
  }
};

const searchByInstitutionName = async query => {
  try {
    const courses = await Course.find({
      type: "course",
      institution: {
        $regex: new RegExp(query)
      }
    });
    return courses;
  } catch (e) {
    return "Something went wrong";
  }
};
