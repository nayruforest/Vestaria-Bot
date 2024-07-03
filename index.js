// basic stuff

require('dotenv').config(); // load environment variables
const { Client, Intents } = require('discord.js'); // import necessary discord.js classes
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] // specify the intents for the client
});

// defines that variables require certain files

const commandHandler = require('./Handlers/commandHandler.js'); // require command handler
const eventHandler = require('./Handlers/eventHandler.js'); // require event handler
const ticketHandler = require('./Handlers/ticketHandler.js'); // require ticket handler

// handlers

eventHandler(client); // initialize event handler with the client
ticketHandler(client); // initialize ticket handler with the client

// messageCreate event - handles if the message starts with a prefix, if yes, continue, if not, return

client.on('messageCreate', message => {
  commandHandler(client, message); // pass message to command handler
});

client.login(process.env.DISCORD_TOKEN); // login to discord with the token from environment variables
