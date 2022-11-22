const { User } = require("../models/users.model");
const { Contact } = require("../models/contacts.model.");
const { User: UserModel } = require("../models/users.model");

async function userContactsGet(req, res, next) {
  const { limit, page } = req.query;
  const skip = (page - 1) * limit;
  const { user } = req;
  const { contacts } = await UserModel.findOne(user._id)
    .populate("contacts", {
      email: 1,
      phone: 1,
      subscription: 1,
      _id: 1,
    })
    .skip(skip)
    .limit(limit);
  return res.status(200).json({ data: contacts });
}

async function userContactCreate(req, res, next) {
  const { user } = req;
  const contact = await Contact.create(req.body);
  user.contacts.push(contact);
  const { contacts } = await User.findByIdAndUpdate(user._id, user);
  return res.status(201).json({ data: contacts });
}

module.exports = {
  userContactsGet,
  userContactCreate,
};
