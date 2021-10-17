const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('randomanime')
    .setDescription('Gives random anime quote!'),
  async execute(interaction) {
    const response = await axios.get('https://animechan.vercel.app/api/random');
    const { anime, character, quote } = response.data;
    await interaction.reply(`
**Anime:** *${anime}*

**Character:** *${character}*

*${quote}*
`);
  }
};
