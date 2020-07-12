'use strict';

require('dotenv').config();
const config = require('./config');
const request = require('./src/requests/requestSchema');
const schemas = require('./src/requests/schemas');
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

const fs = require('fs');

const commands = {};
const files = fs.readdirSync('./commands');
const jsFiles = files.filter((file) => file.endsWith('.js'));

jsFiles.forEach((commandFile) => {
  const command = require(`./commands/${commandFile}`);
  if (command.prefix && command.fn) {
    commands[command.prefix] = command.fn;
  }
});

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content[0] === config.prefix) {
    const input = msg.content.split(' ');
    if (input[0].slice(1) === 'anime') {
      const name = input.slice(1).join(' ');
      const variables = { name };
      request.makeRequest(schemas.query, variables).then((info) => {
        const titles = info.data.Media.title;
        const desc = info.data.Media.description;
        const image = info.data.Media.coverImage.large;
        const url = info.data.Media.siteUrl;
        msg.reply(
          `You have requested information about \`${name}\`.\n\nI found: **${titles.english}**\n<${url}>\n\n ${desc}`,
          {
            files: [
              {
                attachment: image,
              },
            ],
          }
        );
      });
    }
  }
});

client.login(TOKEN);
