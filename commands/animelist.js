const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('animelist')
    .setDescription('Link to list of all anime available!'),
  async execute(selection) {
    const embed = await new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('List of Anime')
      .setURL('https://docs.google.com/document/d/19YuCEnYsE74cYIs0yOhY4LvZIrjwUnYqHmJztUA0aGQ/edit?usp=sharing')
      .setDescription('List of available anime for anime quotes.');
    await selection.reply({
      ephemeral: true,
      embeds: [embed]
    });
  }
};
