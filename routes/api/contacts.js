const express = require("express");
const router = express.Router();
const {
  tryCatchWrapper,
} = require("../../helpers");
const {
  getAll,
} = require("../../models/contactsFn");
const {
  Contact,
} = require("../../models/contacts.model.");

router.get("/", tryCatchWrapper(getAll));

router.get(
  "/:contactId",
  async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findOne({
      _id: contactId,
    });
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }
    return res.status(200).send(contact);
  }
);

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = {
    name,
    email,
    phone,
  };
  Contact.create(newContact);
  return res.status(201).send(newContact);
});

router.delete(
  "/:contactId",
  async (req, res, next) => {
    const { contactId } = req.params;
    const contact =
      await Contact.findByIdAndRemove({
        _id: contactId,
      });
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
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const body = {
      name,
      email,
      phone,
    };
    const newContact =
      await Contact.findByIdAndUpdate(
        { _id: contactId },
        body,
        { new: true }
      );

    if (!newContact) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }
    return res.status(201).send(newContact);
  }
);

router.patch(
  "/:contactId/favorite",
  async (req, res, next) => {
    const { contactId } = req.params;
    const body = req.body;
    const newContact =
      await Contact.findByIdAndUpdate(
        { _id: contactId },
        { favorite: body.favorite },
        { new: true }
      );

    if (!newContact) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }
    return res.status(201).send(newContact);
  }
);

module.exports = router;
