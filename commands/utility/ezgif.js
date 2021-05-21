const config = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
  name: "ezgif",
  description: "ezgif",
  event: "message",
  needs_prefix: true,
  async execute(message, args) {
    if (!(args.length > 1 && args[0] === this.name)) return false;

    // INACTIVE
    return true;
  },
};
