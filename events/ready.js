const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const { Client, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const config = require(`../config.json`)

const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 3
});

module.exports = async (client) => {

  const rest = new REST({ version: "10" }).setToken(TOKEN || process.env.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`░██╗░░░░░░░██╗░█████╗░░█████╗░██╗░░░░░███████╗██╗░░██╗░█████╗░
░██║░░██╗░░██║██╔══██╗██╔══██╗██║░░░░░██╔════╝╚██╗██╔╝██╔══██╗
░╚██╗████╗██╔╝██║░░██║██║░░██║██║░░░░░█████╗░░░╚███╔╝░███████║
░░████╔═████║░██║░░██║██║░░██║██║░░░░░██╔══╝░░░██╔██╗░██╔══██║
░░╚██╔╝░╚██╔╝░╚█████╔╝╚█████╔╝███████╗███████╗██╔╝╚██╗██║░░██║
░░░╚═╝░░░╚═╝░░░╚════╝░░╚════╝░╚══════╝╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝

`)

  setInterval(async () => {

    const activities = [`${config.Sunucuİsmi} 💝 Woolexa`,`🔥Developed By Woolexa🔥`]
    const random = activities[
      Math.floor(Math.random() * activities.length)];
    client.user.setPresence({ activities: [{ name: random, status: "dnd", type: ActivityType.Custom }] })

  }, 45000);
};