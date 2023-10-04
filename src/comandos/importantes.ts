import dotenv from "dotenv";
import axios from "axios";
import { EmbedBuilder } from "discord.js";
import type { usuariosD } from "../tipos";

dotenv.config();

const API_URL = process.env.API_URL;
const GET_URL = `${API_URL}/usuarios`;

export default async function destacados(interaction: any) {
  const usuarios = await axios.get<usuariosD[]>(GET_URL)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (!usuarios) {
    await interaction.reply("Hubo un error al obtener los usuarios");
    return;
  }
}
