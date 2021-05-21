const config = require("../../config.json");
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
        `that's not how you use that ;-;\ntype "owl srguide/srhelp to learn how!"`
      );
      return true;
    }

    const roles = ["tank", "damage", "support", "all"];
    const btag = args[1];

    const hashtag_pos = btag.indexOf("#");

    if (hashtag_pos === -1) {
      message.channel.send(`battletag format:\nname#0000`);
      return true;
    }

    const formatted_btag = btag.split("#").join("-");

    const role = args[2];
    if (!roles.includes(role)) {
      message.channel.send(
        `that's not a valid role!\n valid roles are "tank", "damage", "support", and "all"`
      );
      return true;
    }

    try {
      const stats = await ow.getBasicInfo(formatted_btag, "pc");

      if (role !== "all") {
        if (!stats.rank[role]) {
          message.channel.send("role not placed");
          return true;
        }

        const role_sr = stats.rank[role].sr;

        message.channel.send(`${role} sr: ${role_sr}`);
        return true;
      }

      let sr_msg = ``;

      for (const played_role in stats.rank) {
        sr_msg += `${played_role} sr: ${stats.rank[played_role].sr}\n`;
      }
      message.channel.send(sr_msg.trim());

      return true;
    } catch (error) {
      switch (error.message) {
        case "PROFILE_NOT_FOUND":
          message.channel.send("cannot find profile");
          return true;

        case "PROFILE_PRIVATE":
          message.channel.send("profile is private");
          return true;

        default:
          message.channel.send(`ERROR`);
          console.error(error);
          return true;
      }
    }
  },
};
