import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.API_URL;

export default async function registrarUsuarios(message: any) {
  if (message.author.bot) return;

  const infoUsuario = {
    discord_id: message.author.id,
    nombre_visual: message.author.globalName,
    nombre_global: message.author.username,
    avatar: await message.author.avatarURL({ size: 512 }),
  };

  const usuarioExistente = await axios
    .get(`${API_URL}/usuarios/${infoUsuario.discord_id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  if (!usuarioExistente) {
    console.log("Backend no disponible");
    return;
  }

  if (usuarioExistente) {
    await axios
      .put(`${API_URL}/usuarios/${infoUsuario.discord_id}`, infoUsuario)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
    return;
  }

  await axios
    .post(`${API_URL}/usuarios`, infoUsuario)
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  return;
}
