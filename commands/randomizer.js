const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('randomizer')
    .setDescription("A randomizer for when you're indecisive!")
    .addStringOption(option =>
      option.setName('options')
        .setRequired(true)
        .setDescription('separate your choices with a , followed by a space')),
  async execute(selection) {
    const optionString = await selection.options._hoistedOptions[0].value;
    if (!optionString.includes(', ')) return await selection.reply({ content: 'Please provide at least two options and separate your choices with a comma followed by a space(, )!', ephemeral: true });
    const randomArray = optionString.split(', ');
    await selection.reply({
      content: `
__**Your Random Selection is...**__
${randomArray[Math.floor(Math.random() * randomArray.length)]}
`
    });
  }
};
