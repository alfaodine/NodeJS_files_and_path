const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, ".", "db", "contacts.json");

const listContacts = async () => {
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  console.log(JSON.parse(fileData));
};

const getContactById = async ({ id: contactId }) => {
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  const contacts = JSON.parse(fileData);
  const requestedContact = contacts.find((contact) => contact.id === contactId);
  console.log(requestedContact || null);
};

const removeContact = async ({ id: contactId }) => {
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  const contacts = JSON.parse(fileData);
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== +contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  console.log(updatedContacts);
};

const addContact = async ({ name, email, phone }) => {
  const fileData = await fs.readFile(contactsPath, (err) => {
    if (err) throw err;
  });
  const contacts = JSON.parse(fileData);
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  console.log(updatedContacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
