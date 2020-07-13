const request = require('../requests/requestSchema');
const schemas = require('../requests/schemas');

const main = (msg) => {
  if (msg.content.startsWith('!manga')) {
    const input = msg.content.split(' ');
    if (input.length === 1) {
      return;
    }
    const name = input.slice(1).join(' ');
    const variables = { name };

    request.makeRequest(schemas.queryManga, variables).then((info) => {
      const data = info.data.Media;
      const title = data.title.romaji;
      const image = data.coverImage.large;

      infoMessage = `\n**${title}**\n<${data.siteUrl}>\n\nScore: ${data.averageScore}\nStart: ${data.startDate.day}/${data.startDate.month}/${data.startDate.year}\nEnd: ${data.endDate.day}/${data.endDate.month}/${data.endDate.year}\nVolumes: ${data.volumes}\n\n${data.description}`;

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
  prefix: '!manga',
  fn: main,
};
