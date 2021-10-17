const dotenv = require('dotenv');
dotenv.config();
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
// const axios = require('axios');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

// const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
});

eventFiles.forEach(file => {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.user.bot) return;
  const command = client.commands.get(interaction.commandName);

  if (interaction.channelId !== '898815715920998400') {
    return await interaction.reply({ content: 'You can only use commands in the bot channel!', ephemeral: true });
  }

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
