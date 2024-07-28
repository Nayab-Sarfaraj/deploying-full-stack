const mongoose = require("mongoose");
const bcypt = require("bcrypt");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "email is alredy registerred"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});
userSchema.pre("save", async function () {
  try {
    const salt = await bcypt.genSalt(10);
    this.password = await bcypt.hash(this.password, salt);

  } catch (error) {
    console.log(error);
  }
});
const User = mongoose.model("user", userSchema);
module.exports = User;
