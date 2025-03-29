const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const verifyJWTToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")?.[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded_data = jwt.verify(token, process_params.env.JWT_SECTET);
    const userData = User.findById(decoded_data?.id);

    if (user) {
      token.user = userData;
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({
      error: "Invalid token",
    });
  }

  next();
};

const generateJWTToken = (payload) => {
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

module.exports = { verifyJWTToken, generateJWTToken };
