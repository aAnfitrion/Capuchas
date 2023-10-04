import dotenv from "dotenv";
import {
  ApplicationCommand,
  ApplicationCommandOptionType,
  REST,
  Routes,
} from "discord.js";

dotenv.config();
const CLIENTID: any = process.env.CLIENTID;
const GUILDID: any = process.env.GUILDID;
const TOKEN: any = process.env.TOKEN;

const comandos = [
  {
    name: "ban",
    description: "Comando para banear a un usuario del servidor",
    options: [
      {
        name: "usuario",
        description: "usuario a banear",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: "reason",
        description: "razón para banear al usuario especificado",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "importantes",
    description: "Comando para ver los usuarios más importantes del servidor",
  },
];

(async () => {
  try {
    const rest = new REST({ version: "10" }).setToken(TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), {
      body: comandos,
    });

    console.log("Comandos registrados com exito!");
  } catch (error) {
    console.error(error);
  }
})();
