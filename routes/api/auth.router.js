const express = require("express");
const authRouter = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const { validateEmailPass } = require("../../middlewares/validateEmailPass");
const { tokenCheck } = require("../../middlewares/auth");
const { signup, login, logout } = require("../../controllers/authController");

authRouter.post(
  "/signup",
  tryCatchWrapper(validateEmailPass),
  tryCatchWrapper(signup)
);
authRouter.post(
  "/login",
  tryCatchWrapper(validateEmailPass),
  tryCatchWrapper(login)
);
authRouter.get("/logout", tryCatchWrapper(tokenCheck), tryCatchWrapper(logout));

module.exports = authRouter;
