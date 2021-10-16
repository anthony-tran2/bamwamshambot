require('dotenv/config');
const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('BamWamSham is online bb!');
});

client.login(process.env.DISCORD_TOKEN);
