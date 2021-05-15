const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const clc = require("cli-color");

const contactsPath = path.join("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const contact = result.filter((el) => el.id === +contactId);
    console.log(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const contact = result.filter((el) => el.id !== +contactId);
    console.table(contact);
    console.log(` delte contact by id ${clc.red(contactId)}`);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, (err) => {
      if (err) console.error(err);
    });
    const content = JSON.parse(data);
    const newContact = { id: shortid.generate(), name, email, phone };
    const contactsList = JSON.stringify([newContact, ...content], null, "\t");
    console.log(`added new user ${clc.green(newContact.name)}`);
    await fs.writeFile(contactsPath, contactsList, (err) => {
      if (err) console.error(err);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
