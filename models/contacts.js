const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(
  __dirname,
  "./contacts.json"
);

const listContacts = async () => {
  const db = await fs.readFile(contactsPath);
  return JSON.parse(db);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(
    (item) => item.id === String(contactId)
  );
  return contactById;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contact = await getContactById(contactId);

  if (!contact) {
    console.log(
      `no contact with ${contactId} id`
    );
    return null;
  }
  const contactsWithoutDel = allContacts.filter(
    (item) => item.id !== contactId.toString()
  );
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsWithoutDel)
  );
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push(body);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts)
  );
};

const updateContact = async (contactId, body) => {
  const newContact = {
    contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const deletedContact = await removeContact(
    contactId
  );
  if (!deletedContact) {
    return;
  }
  await addContact(newContact);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
