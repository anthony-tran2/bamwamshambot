const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('animelist')
    .setDescription('Link to list of all anime available!'),
  async execute(selection) {
    await selection.reply({
      content: `
__**List of Anime**__
https://docs.google.com/document/d/19YuCEnYsE74cYIs0yOhY4LvZIrjwUnYqHmJztUA0aGQ/edit?usp=sharing
`,
      ephemeral: true
    });
  }
};
