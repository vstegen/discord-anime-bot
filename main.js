"use strict";

require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

const fs = require("fs");

const commands = {};
const files = fs.readdirSync("./src/commands");
const jsFiles = files.filter((file) => file.endsWith(".js"));

jsFiles.forEach((commandFile) => {
  const command = require(`./src/commands/${commandFile}`);
  if (command.prefix && command.fn) {
    commands[command.prefix] = command.fn;
  }
});

client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  const prefix = msg.content.split(" ")[0];
  if (commands[prefix] === undefined || msg.author.bot) {
    return;
  }

  commands[prefix](msg);
});

client.login(TOKEN);
