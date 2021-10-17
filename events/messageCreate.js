module.exports = {
  name: 'messageCreate',
  execute(message) {
    if (message.content.toLowerCase() === 'joe') return message.reply({ content: 'Mama!' });
    else if (message.content.toLowerCase() === 'guess what?' || message.content.toLowerCase() === 'guess what') return message.reply({ content: 'Chicken Butt!' });
    else if (message.content.toLowerCase() === 'guess why?' || message.content.toLowerCase() === 'guess why') return message.reply({ content: 'Chicken Thigh!' });
  }
};
