const config = require("../../config.json");

module.exports = {
  name: "srguide",
  description: "sr command help",
  event: "message",
  aliases: ["srhelp"],
  needs_prefix: true,
  async execute(message, args) {
    if (!args.length) return false;
    if (!(args[0] === this.name || this.aliases.includes(args[0])))
      return false;

    let out_str =
      `sr command usage:\n` +
      `> owl sr btag#0000 <role>\n` +
      `available roles include:\n` +
      `> tank, damage, support, and all`;

    message.channel.send(out_str);

    return true;
  },
};
