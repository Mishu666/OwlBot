const config = require("../config.json");
const Discord = require("discord.js");
const ow = require("overwatch-stats-api");

module.exports = {
  name: "sr",
  description: "show player sr",
  event: "message",
  aliases: ["rating"],
  needs_prefix: true,
  async execute(message, args) {
    if (!args.length) return false;
    if (!(args[0] === this.name || this.aliases.includes(args[0])))
      return false;

    if (args.length !== 3) {
      message.channel.send(
        'that\'s not how you use that ;-;\n \
        type "owl srguide/srhelp to learn how!"'
      );
      return true;
    }

    const roles = ["tank", "dps", "support", "all"];
    const btag = args[1];
    const hashtag_pos = btag.indexOf("#");

    if (hashtag_pos === -1) {
      message.channel.send("battletag format:\n \
        name#0000");
      return true;
    }

    const role = args[2];
    if (!roles.includes(role)) {
      message.channel.send(
        'that\'s not a valid role!\n \
        valid roles are "tank", "dps", "support", and "all"'
      );
      return true;
    }

    try {
      const stats = await ow.getBasicInfo(btag, "pc");
    } catch (error) {
      switch (error) {
        case "PROFILE_NOT_FOUND":
          message.channel.send("cannot find profile");
          return true;

        case "PROFILE_PRIVATE":
          message.channel.send("profile is private");
          return true;

        default:
          message.channel.send(config.ERROR_MSG);
          return true;
      }
    }

    if (role !== "all") {
      const role_sr = stats[role]["sr"];

      message.channel.send(`${role} sr: ${role_sr}`);
      return true;
    }

    const sr_list = [
      stats[roles[0]]["sr"],
      stats[roles[1]]["sr"],
      stats[roles[2]]["sr"],
    ];

    message.channel.send(`${roles[0]} sr: ${sr_list[0]}\n
      ${roles[1]} sr: ${sr_list[1]}\n
      ${roles[2]} sr: ${sr_list[2]}\n`);

    return true;
  },
};
