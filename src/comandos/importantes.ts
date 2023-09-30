import dotenv from "dotenv";
import axios from "axios";
import { EmbedBuilder } from "discord.js";
import type { usuariosD } from "../tipos";

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

  if (!usuariosInfo) {
    message.channel.send(
      "Lo sentimos, no se ha podido ejecutar este comando. Intentalo de nuevo más tarde.",
    );
    return;
  }

  let listaUsuarios = "";

  usuariosInfo.sort(
    (mayor: usuariosD, menor: usuariosD) =>
      menor.importancia - mayor.importancia,
  );
  usuariosInfo.map((usuario: usuariosD) => {
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
