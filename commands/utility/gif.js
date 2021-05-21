const config = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
  name: "gif",
  description: "show a gif",
  event: "message",
  needs_prefix: true,
  async execute(message, args) {
    if (!(args.length > 1 && args[0] === this.name)) return false;

    const search_str = args.slice(1, args.length).join(" ");
    const url = `https://api.tenor.com/v1/search?q=${search_str}&key=${process.env.TENOR_KEY}&limit=10`;
    const response = await fetch(url);
    const result = await response.json();

    const gif_index = Math.floor(Math.random() * result.results.length);

    message.channel.send(result.results[gif_index].url);

    return true;
  },
};
