const config = require("../../config.json");

module.exports = {
  name: "avatar",
  description: "shows user(s) avatars",
  aliases: ["pfp", "icon"],
  event: "message",
  needs_prefix: true,
  execute(message, args) {
    if (!(args.length > 1 && (args[0] === this.name || this.aliases.includes(args[0]))))
      return false;

    if (!message.mentions.users.size) {
      message.channel.send(
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      );
    } else {
      for (const member of message.mentions.users) {
        message.channel.send(
          member[1].displayAvatarURL({ format: "png", dynamic: true }) //member[1] -> User
        );
      }
    }
    return true;
  },
};
