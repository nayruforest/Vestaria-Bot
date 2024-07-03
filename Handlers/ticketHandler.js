const { MessageEmbed } = require('discord.js');
const { createTicketChannel } = require('../Utils/ticketUtils.js');

module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (interaction.isSelectMenu()) {
      if (interaction.customId === 'ticket_select') {
        const category = interaction.values[0];
        const guild = interaction.guild;

        const ticketChannel = await createTicketChannel(guild, interaction.user, category); // create a ticket channel

        await interaction.reply({
          content: `Your ticket has been successfully created: ${ticketChannel}`, // reply to the interaction
          ephemeral: true // make the reply only visible to the user
        });
      }
    } else if (interaction.isButton()) {
      const staffRoleId = '1128626175376371802'; // id for the staff role
      
      if (interaction.customId === 'close_ticket') {
        const channel = interaction.channel;
        await channel.send('This ticket will be closed in 5 seconds...'); // notify the user that the ticket will be closed
        setTimeout(async () => {
          await channel.delete(); // delete the ticket channel after 5 seconds
        }, 5000);
      } else if (interaction.customId === 'claim_ticket') {
        if (!interaction.member.roles.cache.has(staffRoleId)) {
          return interaction.reply({
            content: 'You do not have permission to claim this ticket.', // reply if the user doesn't have permission
            ephemeral: true
          });
        }

        const claimedEmbed = new MessageEmbed()
          .setTitle('Ticket Claimed')
          .setDescription(`Your ticket is now being managed by our staff team member: ${interaction.user.username}`)
          .setColor('#00AAFF')
          .setFooter(`Claimed by: ${interaction.user.username}`);

        await interaction.channel.send({ embeds: [claimedEmbed] }); // send an embed message indicating the ticket is claimed

        await interaction.reply({
          content: `You have claimed this ticket.`, // reply to the user claiming the ticket
          ephemeral: true
        });
      }
    }
  });
};
