const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Get a gif!')
    .addStringOption(option =>
      option.setName('searchterm')
        .setRequired(true)
        .setDescription('Your search term!')),
  async execute(selection) {
    const response = await axios.get(`https://g.tenor.com/v1/random?q=${selection.options._hoistedOptions[0].value}&key=${process.env.TENOR_API_TOKEN}&limit=10`);
    const randomGif = await response.data.results[Math.floor(Math.random() * response.data.results.length)].url;
    await selection.reply(randomGif);
  }
};
