const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "message",
  async execute(message) {
    console.log(
      `${message.author.tag} in #${message.channel.name} sent: ${message.content}`
    );

    if (message.author.bot) return;

    const client = message.client;

    let args = message.content.trim().split(/ +/);

    let command_not_found = true;
    let prefixed = false;

    if (args.length && args[0].toLowerCase() === config.prefix) {
      prefixed = true;
      args.shift();
    }

    try {
      for (const command_name of client.commands.keys()) {
        if (config.inactive_commands.includes(command_name)) continue;
        const command = client.commands.get(command_name);
        if (
          command.event !== "message" ||
          (!prefixed && command.needs_prefix) ||
          (prefixed && !command.needs_prefix)
        )
          continue;
        if (await command.execute(message, args)) {
          command_not_found = false;
          break;
        }
      }

      if (prefixed && command_not_found) {
        await client.commands.get("nosuchcommand").execute(message);
      }
    } catch (error) {
      message.channel.send(config.ERROR_MSG);
      console.error(error);
    }
  },
};
