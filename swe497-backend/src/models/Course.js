const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course must have a name"],
  },
  description: {
    type: String,
    required: [true, "Course must have a description"],
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
  },
  img: {
    type: String,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  price: {
    type: Number,
    required: [true, "Course must have a price"],
    currency: {
      type: String,
      default: "SR",
      enum: ["SR", "USD"],
    },
  },
  rating: {
    type: Number,
    default: 0,
    max: 5,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
  isSuspended: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    min: 0,
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: [true, "Course must have an institution"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Course must have a category"],
  },
  tags: {
    type: String,
    required: [true, "Course must have tags for metadata"],
  },
});

CourseSchema.pre("deleteOne", function(next) {
  const courseId = this.getQuery()["_id"];
  mongoose
    .model("Cart")
    .deleteMany({ courses: courseId }, function(err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log("success");
        next();
      }
    });
});

module.exports = mongoose.model("Course", CourseSchema);
