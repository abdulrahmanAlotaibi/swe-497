const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    course: {
        type: String,
        required: [true, 'Review must have a course referense']
    },
    student: {
        type: String,
        required: [true, 'The review must be written by a student']
    },
    text: String,
    rating: {
        type: Number,
        required: [true, 'The review must include a rating'],
        validate: {
            validator: function(el) {
                return el >= 1 || el <= 4;
            },
            message: "Review's rating must be between 1 and 4"
        }
    }
});

module.exports = mongoose.model("Review", reviewSchema);