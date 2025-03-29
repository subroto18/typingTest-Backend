const { generateJWTToken } = require("../middleware/auth.middleware");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    let userData = req.body;
    const user = new User(userData);
    await user.save();

    let jwtPayload = {
      id: user._id,
      email: user.email,
    };

    const token = generateJWTToken(jwtPayload);
    setTokenIntoCookie(req, res); // set token into cookie for authorization

    res.status(200).json({
      message: "success",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while creating user");
  }
};

const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    const isEmailExist = User.findOne({ email: "email" });

    if (!isEmailExist) res.status(401).json({});

    const response = await user.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while creating user");
  }
};

const getUser = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("Something went wrong while fetching user data");
  }
};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

const setTokenIntoCookie = (req, res) => {
  // Set the token as a cookie
  res.cookie("authToken", token, {
    httpOnly: true, // Prevent access to the cookie from JavaScript
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "strict", // Protect against CSRF
    maxAge: 3600000, // 1 hour in milliseconds
  });
};

module.exports = { createUser, getUser, updateUser, deleteUser };
