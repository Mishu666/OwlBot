const config = require("../config.json");

module.exports = {
  name: "ping",
  description: "ping command",
  event: "message",
  needs_prefix: true,
  execute(message, args) {
    if (!(args.length === 1 && args[0] === this.name)) return false;
    message.channel.send("pong");
    return true;
  },
};
