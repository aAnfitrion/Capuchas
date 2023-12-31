import {
  Client,
  CommandInteraction,
  GatewayIntentBits,
  Interaction,
} from "discord.js";
import dotenv from "dotenv";
import axios from "axios";
import banear from "./comandos/moderacion/ban";
import kick from "./comandos/moderacion/kick";
import { unban } from "./comandos/moderacion/unban";
import info_usuario from "./comandos/utilidad/info_usuario";
import info_server from "./comandos/utilidad/info_server";
import info_usuario_avatar from "./comandos/utilidad/info_usuario_avatar";
import Info_Area from "./comandos/utilidad/info_area";
import importantes from "./comandos/utilidad/importantes";
import registrarUsuarios from "./eventos/registrarUsuarios";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const TOKEN = process.env.TOKEN;
const APIURL = process.env.KEVINAPIURL;

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.login(TOKEN);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "ban":
      await banear(client, interaction);
      break;

    case "expulsar":
      await kick(interaction);
      break;

    case "unban":
      await unban(interaction);
      break;

    case "usuario":
      await info_usuario(interaction);
      break;

    case "servidor":
      await info_server(interaction);
      break;

    case "avatar":
      await info_usuario_avatar(interaction);
      break;

    case "lenguaje":
      await Info_Area(interaction);
      break;

    case "importantes":
      importantes(interaction);
      break;
    default:
      break;
  }
});

client.on("messageCreate", (message) => {
  registrarUsuarios(message);
});
