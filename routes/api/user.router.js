const express = require("express");
const userRouter = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const { middleware } = require("../../middlewares/middleware");
const {
  userContactsGet,
  userContactCreate,
} = require("../../controllers/usersController");

userRouter.get(
  "/contacts",
  tryCatchWrapper(middleware),
  tryCatchWrapper(userContactsGet)
);
userRouter.post(
  "/contacts",
  tryCatchWrapper(middleware),
  tryCatchWrapper(userContactCreate)
);

module.exports = userRouter;
