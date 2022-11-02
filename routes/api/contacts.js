const express = require("express");
const uniqid = require("uniqid");
const Joi = require("joi");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
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
  const id = uniqid();
  const { name, email, phone } = req.body;

  const { error, value } = schema.validate({
    name,
    email,
    phone,
  });
  if (error) {
    console.log("res: ", error, value);
    return res.status(400).json({
      message: "missing required name field",
    });
  }
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  addContact(newContact);
  return res.status(200).send(newContact);
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
