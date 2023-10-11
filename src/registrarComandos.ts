import dotenv from "dotenv";
dotenv.config()
const CLIENTID:any = process.env.CLIENTID;
const GUILDID:any = process.env.GUILDID;
const TOKEN:any = process.env.TOKEN;
import { ApplicationCommand, ApplicationCommandOptionType, REST, RESTPatchAPIApplicationGuildCommandJSONBody, RESTPatchAPIAutoModerationRuleJSONBody, Routes } from "discord.js";
const comandos = [
  {
    name: "ban",
    description: "Comando para banear a un usuario del servidor",
    options: [
      {
        name: 'id_usuario',
        description: 'usuario a banear',
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: 'razon',
        description: 'razón para banear al usuario especificado',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'mensajes_a_eliminar',
        description: 'los mensajes publicados en el tiempo indicado (segundos) seran eliminados.',
        required: true,
        type: ApplicationCommandOptionType.Number,
      },
    ]
  },
  {
    name: "unban",
    description: "Comando para banear a un usuario del servidor",
    options: [
      {
        name: 'id_usuario',
        description: 'ID del usuario a desbanear',
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: 'razon',
        description: 'razón para desbanear al usuario especificado',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ]
  },
  {
    name: "expulsar",
    description: "Comando para expulsar a un usuario",
    options: [
      {
        name: 'usuario',
        description: 'Usuario a expulsar',
        required: true,
        type: ApplicationCommandOptionType.User
      },
      {
        name: 'razon',
        description: 'Razon de la expulsión',
        required: true,
        type: ApplicationCommandOptionType.String
      }
    ]
  },
  {
    name: 'usuario',
    description: 'Permite obtener toda información del usuario mencionado',
    options: [
      {
        name: 'usuario',
        description: 'Usuario del que se quiere obtener la información',
        required: true,
        type: ApplicationCommandOptionType.User
      }
    ]
  },
  {
    name: 'avatar',
    description: 'Te permite obtener una vista más amplia de un avatar',
    options: [
      {
        name: 'usuario',
        description: 'Usuario del que se quiere obtener la información',
        required: true,
        type: ApplicationCommandOptionType.User
      }
    ]
  },
  {
    name: 'lenguaje',
    description: 'Te permite obtener la información de un lenguaje',
    options: [
      {
        name: 'lenguaje',
        description: 'Area del que se quiere obtener la información (frontend/backend)',
        required: true,
        type: ApplicationCommandOptionType.String
      }
    ]
  },
  {
    name: 'servidor',
    description: 'Permite obtener toda información del servidor',
  },
  {
    name: 'subir_oferta',
    description: 'Permite subir una oferta de trabajo con sueldo en el canal de ofertas de trabajo',
    options: [
      {
        name: 'titulo',
        description: 'Escribe en el titulo que buscas exactamente',
        required: true,
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'Descripción',
        description: 'Describe de manera mas especifica que buscas',
        required: true,
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'Pago',
        description: 'El pago que daras por el trabajo',
        required: true,
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'Forma de contacto',
        description: 'Escribe la forma en la que contactarte',
        required: true,
        type: ApplicationCommandOptionType.String
      },
    ]
  }
  
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
