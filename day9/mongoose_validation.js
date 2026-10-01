const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [1, "Name cannot be empty"],
        maxlength: [100, "Name cannot exceed 100 characters"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    age: {
        type: Number,
        min: [17, "Minimum age is 17"],
        max: [30, "Maximum age is 30"]
    }
});