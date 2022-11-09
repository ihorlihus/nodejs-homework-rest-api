const express = require("express");
const router = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const {
  getAll,
  getContactById,
  createNewContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../models/contactsFn");

router.get("/", tryCatchWrapper(getAll));
router.get("/:contactId", tryCatchWrapper(getContactById));
router.post("/", tryCatchWrapper(createNewContact));
router.delete("/:contactId", tryCatchWrapper(removeContact));
router.put("/:contactId", tryCatchWrapper(updateContact));
router.patch("/:contactId/favorite", tryCatchWrapper(updateStatus));

module.exports = router;
