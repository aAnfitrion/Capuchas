import dotenv from "dotenv";
import axios from "axios";
import { EmbedBuilder } from "discord.js";

dotenv.config();

const API_URL = process.env.API_URL;
const GET_URL = `${API_URL}/usuarios`;

export default async function destacados(message: any) {
  if (message.author.bot) return;
  if (!message.content.startsWith("!importantes")) return;

  const usuariosInfo = await axios
    .get(GET_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  let listaUsuarios = "";

  usuariosInfo.sort((mayor, menor) => menor.importancia - mayor.importancia);
  usuariosInfo.map((usuario) => {
    listaUsuarios += `👤 <@${usuario.discord_id}> con ${usuario.importancia} de importancia \n`;
  });

  const mensajeImportantes = new EmbedBuilder()
    .setTitle("Los usuarios más importantes del servidor")
    .setThumbnail(usuariosInfo[0].avatar)
    .setDescription(listaUsuarios)
    .setColor("#2fd8de")
    .setImage(
      "https://cdn.discordapp.com/attachments/1121098388583227554/1121843021894393926/image.psds.png",
    );

  message.channel.send({ embeds: [mensajeImportantes] });
}
