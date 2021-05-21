const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "color",
  description: "set user color",
  aliases: ["colour"],
  event: "message",
  needs_prefix: true,
  async execute(message, args) {
    if (
      !(
        args.length === 2 &&
        (args[0] === this.name || this.aliases.includes(args[0]))
      )
    )
      return false;
    let color = args[1];

    let resolved_color = Discord.Util.resolveColor(color.toUpperCase());

    if (!resolved_color) {
      let msg =
        "invalid color, either enter a color hex value or one of the preset colors,\n";
      msg += 'for a list of available colors type "owl colors" :)';

      message.channel.send(msg.trim());

      return true;
    }

    let color_role_name = "color" + resolved_color.toString();
    let current_color_role = message.member.roles.cache.find((r) =>
      r.name.startsWith("color")
    );

    //get the highest editable role

    let guild_roles = message.guild.roles.cache.array();
    guild_roles.sort((roleA, roleB) => roleA.position - roleB.position);

    let role_position = guild_roles.length - 1;

    while (role_position > 1) {
      if (
        guild_roles[role_position].editable &&
        !guild_roles[role_position].name === "ratio'd"
      ) {
        break;
      }
      role_position -= 1;
    }

    if (current_color_role) {
      await current_color_role.setName(color_role_name);
      await current_color_role.setColor(resolved_color);
      await current_color_role.setPosition(role_position);
      return true;
    }

    let new_role = await message.guild.roles.create({
      data: {
        name: color_role_name,
        color: resolved_color,
        position: role_position,
      },
    });

    await message.member.roles.add(new_role);
    return true;
  },
};
