require('dotenv/config');
const { Intents } = require('discord.js');
const Discord = require('discord.js');

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

const prefix = '!';

client.on('ready', () => {
  console.log('BamWamSham online!'); //eslint-disable-line
});

client.on('messageCreate', message => {
  if (!message.content.startsWith('!') || message.channelId !== '898815715920998400') return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.reply({
      content: 'pong!'
    });
  } else if (command === 'joe') {
    message.reply({
      content: 'Mama!'
    });
  } else if (`${command} ${args.shift().toLowerCase()}` === 'guess what?') {
    message.reply({
      content: 'chicken butt'
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
