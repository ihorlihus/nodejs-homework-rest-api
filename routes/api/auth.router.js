const express = require("express");
const authRouter = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const { validationUser } = require("../../middlewares/validation");
const { tokenCheck } = require("../../middlewares/auth");
const { signup, login, logout } = require("../../controllers/authController");
const { avatarForTmp } = require("../../middlewares/avatarForTmp");

authRouter.post(
  "/signup",
  tryCatchWrapper(validationUser),
  tryCatchWrapper(avatarForTmp),
  tryCatchWrapper(signup)
);
authRouter.post(
  "/login",
  tryCatchWrapper(validationUser),
  tryCatchWrapper(login)
);
authRouter.get("/logout", tryCatchWrapper(tokenCheck), tryCatchWrapper(logout));

module.exports = authRouter;
