const { User } = require("../models/users.model");
const { Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  const user = new User({ email, password: hashedPass });
  try {
    await user.save();
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      const err = new Conflict("Email in use");
      return res.status(err.status).json(err.message);
    }
    throw error;
  }
  return res.status(201).json({ user: { _id: user._id } });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Unauthorized("Email or password is wrong");
  }
  const token = jwt.sign({ _id: user._id }, JWT_SECRET.toString(), {
    expiresIn: "15m",
  });
  user.token = token;
  await User.findByIdAndUpdate(user._id, user);
  return res.json({ user });
}

async function logout(req, res, next) {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new Unauthorized("Email or password is wrong USER");
  }

  user.token = null;
  await User.findByIdAndUpdate(user._id, user);
  console.log(user);
  return res.json(user.email);

}

module.exports = {
  register,
  login,
  logout,
};
