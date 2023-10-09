import { CommandInteraction, EmbedBuilder } from "discord.js";
import axios from 'axios';


async function ObtenerX() {
  try {
    const respuesta:any = await axios
    .get("http://localhost:1234/frontend")
    .then((res) => {return res.data.toString()})
    .catch((error) => console.error(error));

    console.log(respuesta)
    return respuesta;
  } catch (error) {
    console.error(error);
  }
}



function crearEmbed_Info_Lenguaje(Lenguaje_nombre:any){
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Avatar de usuario')
    // .setDescription(`Avatar del usuario <@${Usuario_ID}>`)
    // .setImage(Usuario_AvatarURL)

    return exampleEmbed;
  }

 export default  async function Info_Area(interaction:CommandInteraction){
  console.log(await ObtenerX())
 await interaction.reply(`Status de la request: ${await ObtenerX()}`)
}