const prefix = '!';

module.exports = (client, message) => {
  if (message.author.bot) return; // ignore messages from bots
  if (!message.content.startsWith(prefix)) return; // ignore messages that don't start with the prefix

  console.log(`Received command: ${message.content}`);

  const args = message.content.slice(prefix.length).trim().split(/ +/); // extract arguments from the message
  const command = args.shift().toLowerCase(); // get the command and convert to lowercase

  const panelRoles = ['-', '-']; // ids of roles that can use the panel command
    
  if (command === 'panel') {
    
    const hasRole = message.member.roles.cache.some(role => panelRoles.includes(role.id)); // check if the user has one of the panel roles
   	
    if (!hasRole) {
        return message.reply('You don\'t have permission.'); // reply if the user doesn't have the required role
    }
    
    console.log('Executing panel command...');
    const panelCommand = require('../Commands/panel.js'); // require the panel command module
    panelCommand.execute(client, message, args); // execute the panel command
  }
   
  else if (command === 'verify') {
      console.log('Executing verify command...');
      const verifyCommand = require('../Commands/verify.js'); // require the verify command module
      verifyCommand.execute(client, message); // execute the verify command
  }
};
