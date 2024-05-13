const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness for email field
    },
    password: {
        type: String,
        required: true,
    },
    passcode: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        requried: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
