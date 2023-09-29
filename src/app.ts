import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import registrarUsuarios from "./eventos/registrarUsuarios";
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

client.on("messageCreate", (message) => {
  registrarUsuarios(message);
});

client.on("messageCreate", (message) => {
  importantes(message);
});
