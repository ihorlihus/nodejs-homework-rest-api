const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env;
const { User } = require("../models/users.model");

async function middleware(req, res, next) {
  console.log("authorization: ", req.headers.authorization);
  const authHeader = req.headers.authorization || "";
  const [tokenType, token] = authHeader.split(" ");

  if (tokenType === "Bearer" && token) {
    try {
      const veryfiedToken = jwt.verify(token, JWT_SECRET.toString());
      const user = await User.findById(veryfiedToken._id);
      if (!user) {
        next(new Unauthorized("No user"));
      }
      req.user = user;
      return next();
    } catch (error) {
      if (error.name === "JsonExpiredError") {
        return next(new Unauthorized(error.name));
      }
      if (error.name === "JsonWebTokenError") {
        return next(new Unauthorized(error.name));
      }
      throw error;
    }
  }
  next(new Unauthorized());
}

module.exports = {
  middleware,
};
