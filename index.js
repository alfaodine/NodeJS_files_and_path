const contacts = require('./contacts')
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const actionsMapper = {
    list: contacts.listContacts,
    get: contacts.getContactById,
    add: contacts.addContact,
    remove: contacts.removeContact,
}
if (argv?.action) actionsMapper[argv.action](argv);
