const request = require('../requests/requestSchema');
const schemas = require('../requests/schemas');

const main = (msg) => {
  if (msg.content.startsWith('!anime')) {
    const input = msg.content.split(' ');
    if (input.length === 1) {
      return;
    }
    const name = input.slice(1).join(' ');
    const variables = { name };

    request.makeRequest(schemas.queryAnime, variables).then((info) => {
      const data = info.data.Media;
      const title = data.title.romaji;
      const image = data.coverImage.large;
      const season = data.season.charAt(0) + data.season.substr(1).toLowerCase();

      infoMessage = `\n**${title}**\n${data.url}\n\nScore: ${data.averageScore}\nSeason: ${season} ${data.seasonYear}\nStart: ${data.startDate.day}/${data.startDate.month}/${data.startDate.year}\nEnd: ${data.endDate.day}/${data.endDate.month}/${data.endDate.year}\nEpisodes: ${data.episodes}\n\n${data.description}`;

      msg.reply(infoMessage, {
        files: [
          {
            attachment: image,
          },
        ],
      });
    });
  }
};

module.exports = {
  prefix: '!anime',
  fn: main,
};
