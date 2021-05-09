const config = require("../config.json");

module.exports = {
  name: "help",
  description: "show list of commands",
  aliases: ["commands"],
  event: "message",
  needs_prefix: true,
  execute(message, args) {
    if (
      !(
        args.length === 1 &&
        (args[0] === this.name || this.aliases.includes(args[0]))
      )
    )
      return false;

    let valid_colors = config.preset_colors;
    let msg = `available commands:\n
                color, colors, ping, sr, srguide`;

    message.channel.send(msg.trim());

    return true;
  },
};
