const express = require("express");
// const uniqid = require("uniqid");
// const joi = require("joi");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  // addContact,
  // updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).send(contacts);
});

router.get(
  "/:contactId",
  async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(
      contactId
    );
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }
    return res.status(200).send(contact);
  }
);

router.post("/", async (req, res, next) => {
  // const id = uniqid();

  res.json({ message: "template message" });
});

router.delete(
  "/:contactId",
  async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await removeContact(
      contactId
    );
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }
    return res
      .status(404)
      .json({ message: "contact deleted" });
  }
);

router.put(
  "/:contactId",
  async (req, res, next) => {
    res.json({ message: "template message" });
  }
);

module.exports = router;
