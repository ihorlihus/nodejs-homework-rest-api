const { User } = require("../models/users.model");
const { Contact } = require("../models/contacts.model.");

async function userContactsGet(req, res, next) {
  const { user } = req;
  return res.status(200).json({ contacts: user.contacts });
}

async function userContactCreate(req, res, next) {
  const { user } = req;
  const contact = await Contact.create(req.body);
  user.contacts.push(contact);
  await User.findByIdAndUpdate(user._id, user);
  return res.status(201).json({ contacts: user.contacts });
}

module.exports = {
  userContactsGet,
  userContactCreate,
};
