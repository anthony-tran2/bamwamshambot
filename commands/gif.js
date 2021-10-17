// const { SlashCommandBuilder } = require('@discordjs/builders');
// const axios = require('axios');

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('animequote')
//     .setDescription('Get a quote from your anime of choice!')
//     .addStringOption(async option => {
//       option.setName('category')
//         .setDescription('The gif category')
//         .setRequired(true);
//       const response = await axios.get('https://animechan.vercel.app/api/available/anime');
//       response.data.forEach(value => {
//         option.addChoice(value);
//       });
//     }),
//   execute(selection) {
//     console.log(selection);
//         const response = await axios.get(`https://animechan.vercel.app/api/quotes/anime?title=${animeTitle}`);
//         const { anime, character, quote } = response.data[Math.floor(Math.random() * response.data.length)];
//         await selection.reply({
//           content: `
//     Anime: ${anime}
//     Character: ${character}
//     ${quote}
//                 `
//         });
//   }
// };
