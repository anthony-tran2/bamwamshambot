const dotenv = require('dotenv');
dotenv.config();
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

client.commands = new Collection();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = [];
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.')) //eslint-disable-line
  .catch(err => console.error(err));

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
    if (error.response) {
      if (error.response.data.error) {
        const embed = await new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('List of Anime')
          .setURL('https://docs.google.com/document/d/19YuCEnYsE74cYIs0yOhY4LvZIrjwUnYqHmJztUA0aGQ/edit?usp=sharing')
          .setDescription('List of available anime for anime quotes.');
        return interaction.reply({ content: 'That anime is not available. Check this link for all of the available anime!', ephemeral: true, embeds: [embed] });
      }
    } else {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
