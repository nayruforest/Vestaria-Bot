const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'panel',
  description: 'Create a ticket panel',

  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle('Support Tickets')
      .setDescription('Select from a row below which category do you need help in.')
      .setColor('#00AAFF'); // create an embed message for the ticket panel

    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('ticket_select')
          .setPlaceholder('Select a category')
          .addOptions([
            { label: '🔺 I need help!', value: 'support' },
            { label: '💣 Someone\'s breaking the rules!', value: 'report' },
            { label: '💬 I have a question!', value: 'question' },
            { label: '💤 Maybe you should implement this!', value: 'server_suggestion' },
            { label: '🤝 I want to partner with this server!', value: 'partnership' },
            { label: '🥇 Where\'s my badge?', value: 'badge_request' },
          ]) // create a select menu with different ticket categories
      );

    const infoembed = new MessageEmbed()
      .setTitle('Additional Info! 💥')
      .setDescription('Please note that our staff members aren\'t online **24/7** which *may* lead to your ticket not being worked on. **IF** you open a ticket, and don\'t recieve a response within 48 hours, please ping the server managers or the owner.\n\n> Please also note that **abusing** this system may lead to you being *blacklisted* from using our ticket system ever again, and even to being banned from the server.\n\n**TICKET GUIDE:**\n> `I need help!` =-= You need help with something, for example, you can\'t change your color, you can\'t verify yourself, etc.\n> `Somebody\'s breaking the rules!` =-= Somebody in the chat is breaking the rules, and the staff aren\'t in the chat, or you want to report a member in your DM\'s, such as harrassing, or advertising, etc.\n> `I have a question` =-= I have a question regarding this server, partnership, bot, anything.\n> `Maybe you should implement this!` =-= I got a server suggestion that i think could benefit the server in some way.\n> `I want to partner with this server!` =-= I am interested in partnering with this server.\n> `Where\'s my badge?` =-= I think I posted enough of gameplays, arts, memes, creations... and I think I should recieve a badge.')
      .setColor('#00AAFF'); // create an embed message with additional info about the ticket system

    await message.channel.send({ embeds: [infoembed] }); // send the additional info embed
    await message.channel.send({ embeds: [embed], components: [row] }); // send the ticket panel embed with the select menu
  }
};
