import dotenv from "dotenv";
import axios from "axios";
import { EmbedBuilder } from "discord.js";
import type { usuariosD } from "../tipos";

dotenv.config();

const API_URL = process.env.API_URL;
const GET_URL = `${API_URL}/usuarios`;

export default async function destacados(interaction: any) {
  const usuariosInfo: usuariosD[] = await axios
    .get(GET_URL)
    .then((res) => res.data)
    .catch(() => console.log("Error al obtener los usuarios"));

  if (!usuariosInfo) {
    await interaction.reply({
      content:
        "Hubo un error al ejecutar este comando. Intentalo de nuevo más tarde.",
      ephemeral: true,
    });
    return;
  }

  let usuariosLista = "";
  usuariosInfo.forEach((usuario, i) => {
    usuariosLista += `**${i + 1}.-** 👤 <@${usuario.discord_id}>
    > ${usuario.importancia} puntos de importancia\n`;
  });

  const importantesEmbed = new EmbedBuilder()
    .setTitle("🌟 Usuarios más importantes del servidor")
    .setDescription(usuariosLista)
    .setColor("#2fd8de")
    .setThumbnail(usuariosInfo[0].avatar)
    .setImage(
      "https://cdn.discordapp.com/attachments/1121098388583227554/1121843021894393926/image.psds.png",
    );

  await interaction.reply({ embeds: [importantesEmbed] });
}
