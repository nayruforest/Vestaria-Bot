const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent } = require('discord.js');

// replace these with the ids of the roles
const verifyRoleId = '';
const unaddRoleId = '';

// replace this with the id of the allowed channel
const allowedChannelId = '';

module.exports = {
  name: 'verify',
  description: 'Verification command',
  async execute(client, message) {
    if (message.channel.id !== allowedChannelId) return; // ignore messages not in the allowed channel

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Verification')
      .setDescription('Make sure you read the rules, there\'s a hidden word in rules that you need to input for you to get verified.\n\nHint: Main Rules in <id:home>\n\nPlease click the button below to verify.'); // create an embed message for verification

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('verify')
        .setLabel('Verify')
        .setStyle('PRIMARY')
    ); // create a button for verification

    await message.channel.send({ embeds: [embed], components: [row] }); // send the embed and button to the channel

    client.on('interactionCreate', async interaction => {
      if (!interaction.isButton() && !interaction.isModalSubmit()) return; // ignore non-button and non-modal interactions

      if (interaction.isButton()) {
        if (interaction.customId === 'verify') {
          const modal = new Modal()
            .setCustomId('verificationModal')
            .setTitle('Verification')
            .addComponents(
              new MessageActionRow().addComponents(
                new TextInputComponent()
                  .setCustomId('verification')
                  .setLabel('Enter the verification word')
                  .setStyle('SHORT')
              )
            ); // create a modal for entering the verification word

          await interaction.showModal(modal); // show the modal to the user
        }
      } else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'verificationModal') {
          const verification = interaction.fields.getTextInputValue('verification'); // get the input from the modal

          if (verification.toUpperCase() === '-') {
            const verificationRole = interaction.guild.roles.cache.get(verifyRoleId);
            const roleToRemove = interaction.guild.roles.cache.get(unaddRoleId);
            const member = interaction.guild.members.cache.get(interaction.user.id);

            if (verificationRole && roleToRemove) {
              await member.roles.add(verificationRole); // add the verification role
              await member.roles.remove(roleToRemove); // remove the unverified role
              await interaction.reply({ content: `You have been verified and given the role!`, ephemeral: true }); // reply to the user
            } else {
              await interaction.reply({ content: `Something went wrong.`, ephemeral: true }); // reply if roles are not found
            }
          } else {
            await interaction.reply({ content: `Wrong verification word`, ephemeral: true }); // reply if verification word is incorrect
          }
        }
      }
    });
  }
};
