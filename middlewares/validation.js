const { User } = require("../models/users.model");

async function validationUser(req, res, next) {
  const user = new User(req.body);
  const error = user.validateSync();
  req.user = user;
  if (error) {
    return res.status(401).json(error);
  }
  next();
}

module.exports = {
  validationUser,
};
