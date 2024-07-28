const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.json({ success: false, message: "all fields are required" });
    const newuser = await User({ email, password, name });
   
    const saveduser = await newuser.save();

    return res.json({ success: true, saveduser });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "all fields are required" });
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "Invalid email or password" });
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching)
      return res.json({
        success: false,
        message: "invalid email or passwowrd",
      });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });
    res.cookie("token", token);
    return res.json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const getUserProfile = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedData)
      return res.json({
        success: false,
        message: "invalid token",
      });
    const user = await User.findById(decodedData.id);
    if (!user)
      return res.json({
        success: false,
        message: "invalid user credentials",
      });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const logout = async (req, res, next) => {
  try {
    res.cookie("token", undefined);
    return res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { register, login, getUserProfile, logout };
