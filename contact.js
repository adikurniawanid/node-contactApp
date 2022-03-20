require("dotenv").config();
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const { CONTACT_DIR_PATH, CONTACT_FILE_NAME } = process.env;
const DATA_PATH = CONTACT_DIR_PATH + "/" + CONTACT_FILE_NAME;

if (!fs.existsSync(CONTACT_DIR_PATH)) {
  fs.mkdirSync(CONTACT_DIR_PATH);
}
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, "[]", "utf8");
}

const loadContact = () => {
  const FileBuffer = fs.readFileSync(DATA_PATH, "utf-8");
  const contacts = JSON.parse(FileBuffer);
  return contacts;
};

const saveContact = async (name, phoneNumber, email) => {
  const contact = { name, phoneNumber, email };
  const contacts = loadContact();

  const duplicate = contacts.find(
    (contact) => contact.phoneNumber === phoneNumber
  );

  if (duplicate) {
    console.log(chalk.red.inverse.bold("Contact already exists"));
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email is not valid"));
      return false;
    }
  }

  if (!validator.isMobilePhone(phoneNumber, "id-ID")) {
    console.log(chalk.red.inverse.bold("Phone number is not valid"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync(DATA_PATH, JSON.stringify(contacts, 0, 4));
  console.log(chalk.green.inverse.bold("Data has been saved"));
};

const getContactList = () => {
  const contacts = loadContact();

  console.log(chalk.blue.inverse.bold("Contact List: "));

  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name} - ${contact.phoneNumber}`);
  });
};

const detailContactByPhoneNumber = (phoneNumber) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.phoneNumber === phoneNumber
  );

  if (!contact) {
    console.log(
      chalk.red.inverse.bold(
        `Contact with phone number : ${phoneNumber} not found`
      )
    );
  } else {
    console.log(chalk.blue.inverse.bold("Contact Detail: "));
    console.log(`Name\t\t: ${contact.name}`);
    console.log(`Phone Number\t: ${contact.phoneNumber}`);
    if (contact.email) {
      console.log(`Email\t\t: ${contact.email}`);
    }
  }
};

const deleteContactByPhoneNumber = (phoneNumber) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.phoneNumber !== phoneNumber
  );

  if (contacts.length === newContacts.length) {
    console.log(
      chalk.red.inverse.bold(
        `Contact with phone number : ${phoneNumber} not found`
      )
    );
    return false;
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(newContacts, 0, 4));
  console.log(chalk.green.inverse.bold("Data has been deleted"));
};

module.exports = {
  saveContact,
  getContactList,
  detailContactByPhoneNumber,
  deleteContactByPhoneNumber,
};
