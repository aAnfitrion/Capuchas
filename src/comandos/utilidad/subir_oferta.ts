import { CommandInteraction, EmbedBuilder } from "discord.js";
import axios from 'axios';



function crearEmbed_Oferta(titulo:any, descripcion:any, pago:any, contacto:any){
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(titulo)
    .setDescription(`${descripcion}`)
    .addFields({
      name: 'pago',
      value: pago,
      inline: true,
    },
    {name: 'contacto', value: contacto}
    )

    return exampleEmbed;
  }

export default  async function Subir_Oferta(interaction:CommandInteraction){
  const titulo = interaction.options.get('titulo')?.value;
  const descripcion = interaction.options.get('descripcion')?.value;
  const pago = interaction.options.get('pago')?.value;
  const contacto = interaction.options.get('Forma de contacto')?.value


  const canal_Ofertas:any = interaction.guild?.channels.cache.get('1157519362090074142');

  canal_Ofertas.send({embeds: crearEmbed_Oferta(titulo, descripcion, pago, contacto)})
}