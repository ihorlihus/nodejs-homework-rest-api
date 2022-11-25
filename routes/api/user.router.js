const express = require("express");
const userRouter = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const { tokenCheck } = require("../../middlewares/auth");
const {
  userContactsGet,
  userContactCreate,
} = require("../../controllers/usersController");

userRouter.get(
  "/current",
  tryCatchWrapper(tokenCheck),
  tryCatchWrapper(userContactsGet)
);

userRouter.post(
  "/contacts",
  tryCatchWrapper(tokenCheck),
  tryCatchWrapper(userContactCreate)
);

module.exports = userRouter;
