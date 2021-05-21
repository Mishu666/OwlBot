module.exports = {
  name: "nosuchcommand",
  description: "command not recognized",
  event: "none",
  needs_prefix: true,
  execute(message) {
    message.channel.send("command not recognized :o");

    return true;
  },
};
