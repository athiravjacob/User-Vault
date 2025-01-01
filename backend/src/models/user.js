const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String, 
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    block: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // Restrict gender to valid values
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validate phone number as a 10-digit number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    dob: {
      type: Date, // Stores the date of birth
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
