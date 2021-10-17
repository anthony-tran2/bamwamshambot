const dotenv = require('dotenv');
dotenv.config();
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
// const axios = require('axios');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

// const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
});

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);

// const prefix = '!';

// client.on('ready', () => {
//   console.log('BamWamSham online!'); //eslint-disable-line
// });

// client.on('messageCreate', message => {
//   if (!message.content.startsWith('!') || message.channelId !== '898815715920998400' || message.author.bot) return;
//   const args = message.content.slice(prefix.length).split(/ +/);
//   const command = args.shift().toLowerCase();

//   if (command === 'help') {
//     message.reply({
//       content: '!ping  !joe  !guess what?  !anime quote random  !anime quote **Anime Title**  !anime list'
//     });
//   } else if (command === 'ping') {
//     message.reply({
//       content: 'pong!'
//     });
//   } else if (command === 'joe') {
//     message.reply({
//       content: 'Mama!'
//     });
//   }
//   if (args[0] === undefined) return;

//   if (command === 'guess') {
//     if (args[0].toLowerCase() === 'what?') {
//       message.reply({
//         content: 'Chicken butt!'
//       });
//     } else if (args[0].toLowerCase() === 'why?') {
//       message.reply({
//         content: 'Chicken thigh!'
//       });
//     }
//   } else if (`${command} ${args[0].toLowerCase()}` === 'anime quote') {
//     args.shift();
//     if (args[0].toLowerCase() === 'random') {
//       axios.get('https://animechan.vercel.app/api/random')
//         .then(quote => {
//           message.reply({
//             content: `
// Anime: ${quote.data.anime}
// Character: ${quote.data.character}
// ${quote.data.quote}
//             `
//           });
//         })
//         .catch(err => console.error(err));
//     } else {
//       let animeTitle = '';
//       if (args[1]) animeTitle = args.join(' '); else animeTitle = args[0];
//       axios.get(`https://animechan.vercel.app/api/quotes/anime?title=${animeTitle}`)
//         .then(response => {
//           const { anime, character, quote } = response.data[Math.floor(Math.random() * response.data.length)];
//           message.reply({
//             content: `
// Anime: ${anime}
// Character: ${character}
// ${quote}
//             `
//           });
//         })
//         .catch(err => {
//           if (err.response.data.error) message.reply({ content: 'Anime not found. Please try a different one!' });
//           if (!err.response.data.error) console.error(err);
//         });
//     }
//   } else if (`${command} ${args[0].toLowerCase()}` === 'anime list') {
//     message.reply({ content: 'https://docs.google.com/document/d/19YuCEnYsE74cYIs0yOhY4LvZIrjwUnYqHmJztUA0aGQ/edit?usp=sharing' });
//   }
// });
