require('dotenv/config');
const { Intents } = require('discord.js');
const Discord = require('discord.js');
const axios = require('axios');

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
  if (!message.content.startsWith('!') || message.channelId !== '898815715920998400' || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    message.reply({
      content: '!ping  !joe  !guess what?  !anime quote random  !anime quote **Anime Title**  !anime list'
    });
  } else if (command === 'ping') {
    message.reply({
      content: 'pong!'
    });
  } else if (command === 'joe') {
    message.reply({
      content: 'Mama!'
    });
  }
  if (args[0] === undefined) return;

  if (command === 'guess') {
    if (args[0].toLowerCase() === 'what?') {
      message.reply({
        content: 'Chicken butt!'
      });
    } else if (args[0].toLowerCase() === 'why?') {
      message.reply({
        content: 'Chicken thigh!'
      });
    }
  } else if (`${command} ${args[0].toLowerCase()}` === 'anime quote') {
    args.shift();
    if (args[0].toLowerCase() === 'random') {
      axios.get('https://animechan.vercel.app/api/random')
        .then(quote => {
          message.reply({
            content: `
Anime: ${quote.data.anime}
Character: ${quote.data.character}
${quote.data.quote}
            `
          });
        })
        .catch(err => console.error(err));
    } else {
      let animeTitle = '';
      if (args[1]) animeTitle = args.join(' '); else animeTitle = args[0];
      axios.get(`https://animechan.vercel.app/api/quotes/anime?title=${animeTitle}`)
        .then(response => {
          const { anime, character, quote } = response.data[Math.floor(Math.random() * response.data.length)];
          message.reply({
            content: `
Anime: ${anime}
Character: ${character}
${quote}
            `
          });
        })
        .catch(err => {
          if (err.response.data.error) message.reply({ content: 'Anime not found. Please try a different one!' });
          if (!err.response.data.error) console.error(err);
        });
    }
  } else if (`${command} ${args[0].toLowerCase()}` === 'anime list') {
    message.reply({ content: 'https://docs.google.com/document/d/19YuCEnYsE74cYIs0yOhY4LvZIrjwUnYqHmJztUA0aGQ/edit?usp=sharing' });
  }
});

client.login(process.env.DISCORD_TOKEN);
