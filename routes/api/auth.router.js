const express = require("express");
const router = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const { validateEmailPass } = require("../../middlewares/validateEmailPass");
const { middleware } = require("../../middlewares/middleware");
const { register, login, logout } = require("../../controllers/authController");

router.post(
  "/register",
  tryCatchWrapper(validateEmailPass),
  tryCatchWrapper(register)
);
router.post(
  "/login",
  tryCatchWrapper(validateEmailPass),
  tryCatchWrapper(login)
);
router.get("/logout", tryCatchWrapper(middleware), tryCatchWrapper(logout));

module.exports = router;
