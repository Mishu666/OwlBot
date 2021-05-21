const config = require("../../config.json");

module.exports = {
  name: "shutdown",
  description: "shuts the bot down",
  aliases: ["kill", "destroy", "die"],
  event: "message",
  needs_prefix: true,
  async execute(message, args) {
    if (
      !(
        args.length === 1 &&
        (args[0] === this.name || this.aliases.includes(args[0]))
      )
    )
      return false;

    if (message.author.id !== config.IDs.users.mishu) {
      message.channel.send("you don't have permission to do that :o");
      return true;
    }

    await message.channel.send("going offline!");
    await message.client.destroy();
    return true;
  },
};
