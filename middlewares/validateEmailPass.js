const { schemaValidMailPassJoi } = require("../models/users.model");

async function validateEmailPass(req, res, next) {
  const { email, password } = req.body;
  const { error } = schemaValidMailPassJoi.validate({
    email,
    password,
  });
  if (error) {
    console.log("error in valid function", error);
    return res.status(400).json(error.message);
  }

  return next();
}

module.exports = {
  validateEmailPass,
};
