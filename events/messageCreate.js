module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;
    if (message.content.toLowerCase().includes('joe')) {
      const urls = ['https://c.tenor.com/oEcYcCQlfs0AAAAM/joe-mama-trollface.gif', 'https://c.tenor.com/_mRWwuz2jx0AAAAd/joe-mama.gif', 'https://c.tenor.com/iVv-SN7A168AAAAC/the-rock-dwayne-johnson.gif', 'https://c.tenor.com/d_peMWk0E10AAAAC/joe-mama-one-piece.gif'];
      return await message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    } else if (message.content.toLowerCase().includes('guess what')) {
      await message.channel.send('Chicken Butt!');
      return await message.channel.send('https://c.tenor.com/8xtx4NSORHEAAAAd/turkey-dance-happy-turkey.gif');
    } else if (message.content.toLowerCase().includes('guess why')) {
      await message.channel.send('Chicken Thigh!');
      return await message.channel.send('https://c.tenor.com/FZiGI9_SvQ8AAAAC/drop-dance.gif');
    }
  }
};
