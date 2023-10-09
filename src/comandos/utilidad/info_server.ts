import { CommandInteraction, GuildMember, EmbedBuilder, Embed } from "discord.js";

function crearEmbed_Info_Usuario(Servidor_Name:any, Servidor_ID:any, Servidor_IconoURL:any, Servidor_HighestRole:any,  Servidor_Fecha_Ano:any, Servidor_Fecha_Mes:any, Servidor_Fecha_Dia:any, Servidor_Banner:any, Servidor_Canal_AFK:any, Servidor_Owner:any, Servidor_Miembros:any){
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Información del servidor')
    // .setDescription(`La información del usuario <@${Usuario_ID}> es la siguiente:`)
    .setThumbnail(Servidor_IconoURL)
    .addFields({name: ' ', value: ` `})

    .addFields({name: 'ID del servidor ', value: `${Servidor_ID}`})
    .addFields({name: 'URL del icono ', value: `[Icono](${Servidor_IconoURL})`, inline: true})
    .addFields({name: 'Se creo el ', value: `${Servidor_Fecha_Dia}/${Servidor_Fecha_Mes}/${Servidor_Fecha_Ano}`, inline: true})
    .addFields({name: 'Rol más alto', value: `<@&${Servidor_HighestRole}>`, inline:true})
    .addFields({name: ' ', value: ` `})

    .addFields({name: 'Canal AFK ', value: `${Servidor_Canal_AFK}`,inline: true},)
    .addFields({name: 'Owner', value: `<@${Servidor_Owner}>`,inline: true},)
    .addFields({name: 'Miembros ', value: `${Servidor_Miembros}`, inline: true},)



    .setImage('https://cdn.discordapp.com/attachments/1121098388583227554/1121843021894393926/image.psds.png')
    return exampleEmbed;
  }
  


export default async function info_server(interaction:CommandInteraction) {

    const Servidor_Name = interaction.guild?.name;
    const Servidor_Descripcion = interaction.guild?.description;
    const Servidor_Icono_URL = interaction.guild?.iconURL();
    const Servidor_ID = interaction.guild?.id;
    const Servidor_Fecha_Ano = interaction.guild?.createdAt.getFullYear();
    const Servidor_Fecha_Mes = interaction.guild?.createdAt.getMonth();
    const Servidor_Fecha_Dia = interaction.guild?.createdAt.getDay();
    const Servidor_Miembros = interaction.guild?.memberCount;
    const Servidor_Banner = interaction.guild?.bannerURL();
    let Servidor_Canal_AFK = interaction.guild?.afkChannel?.name;
    const Servidor_HighestRole = interaction.guild?.roles.highest.position;
    const Servidor_Owner = interaction.guild?.ownerId; 

    if (Servidor_Canal_AFK == null){
      Servidor_Canal_AFK = "Ninguno"
    }
    await interaction.reply({embeds: [crearEmbed_Info_Usuario(Servidor_Name, Servidor_ID, Servidor_Icono_URL, 
      Servidor_HighestRole, Servidor_Fecha_Ano, Servidor_Fecha_Mes, Servidor_Fecha_Dia, Servidor_Banner, Servidor_Canal_AFK, Servidor_Owner, Servidor_Miembros)]});
}