import { REST, Routes } from "discord.js";

require("dotenv").config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const comandos = [
  {
    name: "importantes",
    description: "Comando que funcionará con typescript",
  },
];

(async () => {
  try {
    const rest = new REST({ version: "10" }).setToken(TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: comandos,
    });

    console.log("Comandos registrados com exito!");
  } catch (error) {
    console.error(error);
  }
})();
