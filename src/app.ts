import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import banear from "./comandos/ban";
import importantes from "./comandos/importantes";

dotenv.config();

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
    await banear(client, interaction);
  }

  if (interaction.commandName === "importantes") {
    importantes(interaction);
  }
});
