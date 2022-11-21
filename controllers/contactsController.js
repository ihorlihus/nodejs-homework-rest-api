const { Contact } = require("../models/contacts.model.");
const { notFoundMessage } = require("../helpers");

async function getAll(req, res, next) {
  const contacts = await Contact.find();
  return res.status(200).send(contacts);
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findOne({
    _id: contactId,
  });
  if (!contact) {
    notFoundMessage();
  }
  return res.status(200).send(contact);
}

async function createNewContact(req, res, next) {
  if (!req.body) {
    notFoundMessage();
  }
  if (!req.body.favorite) {
    req.body.favorite = false;
  }
  const newContact = await Contact.create(req.body);
  return res.status(201).send(newContact);
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
  });
  if (!contact) {
    notFoundMessage();
  }
  return res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const newContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    { new: true }
  );

  if (!newContact) {
    notFoundMessage();
  }
  return res.status(201).send(newContact);
}

async function updateStatus(req, res, next) {
  const { contactId } = req.params;
  const body = req.body.favorite;
  const newContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { body },
    { new: true }
  );

  if (!newContact) {
    notFoundMessage();
  }
  return res.status(201).send(newContact);
}

module.exports = {
  getAll,
  getContactById,
  createNewContact,
  removeContact,
  updateContact,
  updateStatus,
};
