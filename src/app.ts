import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import importantes from "./comandos/ban";

<<<<<<< HEAD
=======
dotenv.config();

>>>>>>> 1f6a22e1f227eb3a8e89f4988d4c7cbcdf4915dc
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const TOKEN = process.env.TOKEN;

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.login(TOKEN);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ban") {
    await importantes(client, interaction);
  }
});
