import dotenv from "dotenv";
import {
  ApplicationCommand,
  ApplicationCommandOptionType,
  REST,
  RESTPatchAPIApplicationGuildCommandJSONBody,
  RESTPatchAPIAutoModerationRuleJSONBody,
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
        name: "id_usuario",
        description: "usuario a banear",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: "razon",
        description: "razón para banear al usuario especificado",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: "mensajes_a_eliminar",
        description:
          "los mensajes publicados en el tiempo indicado (segundos) seran eliminados.",
        required: true,
        type: ApplicationCommandOptionType.Number,
      },
    ],
  },
  {
    name: "unban",
    description: "Comando para banear a un usuario del servidor",
    options: [
      {
        name: "id_usuario",
        description: "ID del usuario a desbanear",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: "razon",
        description: "razón para desbanear al usuario especificado",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "expulsar",
    description: "Comando para expulsar a un usuario",
    options: [
      {
        name: "usuario",
        description: "Usuario a expulsar",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: "razon",
        description: "Razon de la expulsión",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "importantes",
    description: "Comando para ver los usuarios más importantes del servidor",
  },
  {
    name: "usuario",
    description: "Permite obtener toda información del usuario mencionado",
    options: [
      {
        name: "usuario",
        description: "Usuario del que se quiere obtener la información",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "avatar",
    description: "Te permite obtener una vista más amplia de un avatar",
    options: [
      {
        name: "usuario",
        description: "Usuario del que se quiere obtener la información",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "lenguaje",
    description: "Te permite obtener la información de un lenguaje",
    options: [
      {
        name: "lenguaje",
        description:
          "Area del que se quiere obtener la información (frontend/backend)",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "servidor",
    description: "Permite obtener toda información del servidor",
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
