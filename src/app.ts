import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

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
