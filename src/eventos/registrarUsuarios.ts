import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.API_URL;
const POST_URL = `${API_URL}/usuarios`;

export default async function registrarUsuarios(message: any) {
  if (message.author.bot) return;

  const infoUsuario = {
    discord_id: message.author.id,
    nombre_visual: message.author.globalName,
    nombre_global: message.author.username,
    avatar: await message.author.avatarURL({ size: 512 }),
  };

  await axios
    .post(POST_URL, infoUsuario)
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  return;
}
