const { readdirSync } = require("fs");
const moment = require("moment");
require("moment-duration-format");
moment.locale('tr')

//Woolexa BABAPİRO\\
module.exports = async (client, interaction) => {

  if (interaction.isChatInputCommand()) {

    if (!interaction.guildId) return;

    readdirSync('./commands').forEach(f => {

      const cmd = require(`../commands/${f}`);

      if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {

        return cmd.run(client, interaction);
      }
    });
  }
}
