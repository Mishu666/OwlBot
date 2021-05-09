const config = require("../config.json");

module.exports = {
  name: "colors",
  description: "show preset colors",
  aliases: ["colours"],
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
    let msg = "available preset colors:\n";
    for (const clr of valid_colors) {
      msg += clr.toLowerCase() + "\n";
    }

    message.channel.send(msg.trim());

    return true;
  },
};
