const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

async function createTicketChannel(guild, user, category) {
  const staffRoleId = ''; // id for staff role
  const ticketCategoryId = ''; // id for ticket category
  const notificationChannelId = ''; // id for notification channel
  const channelName = `ticket-${user.username}`; // name of the ticket channel

  // create the ticket channel with appropriate permissions
  const channel = await guild.channels.create(channelName, {
    type: 'GUILD_TEXT', // channel type
    parent: ticketCategoryId, // set the parent category
    permissionOverwrites: [
      {
        id: guild.id, // deny view channel for everyone
        deny: [Permissions.FLAGS.VIEW_CHANNEL],
      },
      {
        id: user.id, // allow view and send messages for the user
        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
      },
      {
        id: staffRoleId, // allow view and send messages for staff
        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
      }
    ],
  });

  // create an embed message for the ticket
  const embed = new MessageEmbed()
    .setTitle(`Ticket Created!`)
    .setDescription(`thanks for creating a ticket, our staff team will be with you shortly! \n\n> please refrain from pinging them as it could lead to you being *punished*, i already pinged them for you!\n`)
    .setColor('#00AAFF')
    .setFooter(`this ticket has been created by: ${user.username}`);

  // create action row with buttons for claiming and closing the ticket
  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('claim_ticket')
        .setLabel('claim ticket')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('close_ticket')
        .setLabel('close ticket')
        .setStyle('DANGER')
    );

  await channel.send({ embeds: [embed], components: [row] }); // send the embed and buttons

  // send notification to the notification channel
  const notificationChannel = guild.channels.cache.get(notificationChannelId);
  if (notificationChannel) {
    await notificationChannel.send(`\`${user.username}\` has created a ticket!\ncategory: \`${category}\` `);
  }

  return channel; // return the created channel
}

module.exports = { createTicketChannel }; // export the function
