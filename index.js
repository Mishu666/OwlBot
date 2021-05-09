const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");

const fs = require("fs");

const config = require("./config.json");

dotenv.config();

//COMMAND HANDLING

client.commands = new Discord.Collection();
client.passive_commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//EVENT HANDLING

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

try {
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
} catch (error) {
  console.error(error);
}

client.login(process.env.DISCORD_BOT_TOKEN);
