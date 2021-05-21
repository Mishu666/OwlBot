const config = require("../../config.json");
const gif_command = require("../../commands/utility/gif.js");

module.exports = {
  name: "nickname",
  description: "change bot's nickname",
  aliases: ["nick"],
  event: "message",
  needs_prefix: true,
  async execute(message, args) {
    if (
      !(
        args.length > 1 &&
        (args[0] === this.name || this.aliases.includes(args[0]))
      )
    )
      return false;

    if (message.author.id !== config.IDs.users.mishu) {
      const insult =
        config.insults[Math.floor(Math.random() * config.insults.length)];
      message.channel.send(`fuck off you ${insult}`);
      return true;
    }

    if (message.mentions.users.size) {
      message.channel.send("what are you on about");
      return true;
    }

    let new_nick = args.slice(1).join(" ");
    message.guild.me.setNickname(new_nick);
    message.channel.send("8)");

    return true;
  },
};
