const yargs = require("yargs");
const {
  saveContact,
  getContactList,
  detailContactByPhoneNumber,
  deleteContactByPhoneNumber,
} = require("./contact");

yargs
  .command({
    command: "add",
    describe: "add new contact",
    builder: {
      name: {
        describe: "Contact fullname",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Contact email",
        demandOption: false,
        type: "string",
      },
      phoneNumber: {
        describe: "Contact phone number",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      saveContact(argv.name, argv.phoneNumber, argv.email);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Show contact list",
  handler: (argv) => {
    getContactList();
  },
});

yargs.command({
  command: "detail",
  builder: {
    phoneNumber: {
      describe: "Contact phone number",
      demandOption: true,
      type: "string",
    },
  },
  describe: "Show detail contact by phone number",
  handler: (argv) => {
    detailContactByPhoneNumber(argv.phoneNumber);
  },
});

yargs.command({
  command: "delete",
  builder: {
    phoneNumber: {
      describe: "Contact phone number",
      demandOption: true,
      type: "string",
    },
  },
  describe: "Delete contact by phone number",
  handler: (argv) => {
    deleteContactByPhoneNumber(argv.phoneNumber);
  },
});

yargs.parse();
