const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('animequote')
    .setDescription('Get a quote from your anime of choice!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('random')
        .setDescription('Get random anime quote!'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('select')
        .setDescription('Choose your anime!')
        .addStringOption(option =>
          option.setName('title')
            .setRequired(true)
            .setDescription('The title of your anime')
        )),
  async execute(selection) {
    if (selection.options._subcommand === 'select') {
      const response = await axios.get(`https://animechan.vercel.app/api/quotes/anime?title=${encodeURIComponent(selection.options._hoistedOptions[0].value)}`);
      if (!response.status === 404) return await selection.reply({ content: 'That anime is not available. Check this link for all of the available anime! https://docs.google.com/document/d/19YuCEnYsE74cYIs0yOhY4LvZIrjwUnYqHmJztUA0aGQ/edit?usp=sharing', ephemeral: true });
      const { anime, character, quote } = response.data[Math.floor(Math.random() * response.data.length)];
      await selection.reply(`
**Anime:** *${anime}*

**Character:** *${character}*

*${quote}*
`);
    } else if (selection.options._subcommand === 'random') {
      const response = await axios.get('https://animechan.vercel.app/api/random');
      if (!response.status === 404) return await selection.reply({ content: 'There was an error getting the quote. Try again!', ephemeral: true });
      const { anime, character, quote } = response.data;
      await selection.reply(`
**Anime:** *${anime}*

**Character:** *${character}*

*${quote}*
`);
    }
  }
};
