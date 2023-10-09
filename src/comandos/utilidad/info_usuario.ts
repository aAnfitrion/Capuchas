import { CommandInteraction, GuildMember, EmbedBuilder, Embed } from "discord.js";

function crearEmbed_Info_Usuario(Usuario_UserName:any, Usuario_ID:any, Usuario_AvatarURL:any, Usuario_HighestRole:any,  Usuario_Member_Fecha_Ano:any, Usuario_Member_Fecha_Mes:any, Usuario_Member_Fecha_Dia:any){
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Información del usuario')
    // .setDescription(`La información del usuario <@${Usuario_ID}> es la siguiente:`)
    .setThumbnail(Usuario_AvatarURL)
    .addFields({name: ' ', value: ` `})

    .addFields({name: 'ID del usuario ', value: `${Usuario_ID}`})
    .addFields({name: 'URL del avatar ', value: `[Avatar](${Usuario_AvatarURL})`})
    .addFields({name: 'Se unio al servidor el ', value: `${Usuario_Member_Fecha_Dia}/${Usuario_Member_Fecha_Mes}/${Usuario_Member_Fecha_Ano}`})
    .addFields({name: 'Rol más alto', value: `<@&${Usuario_HighestRole}>`})
    .setImage('https://cdn.discordapp.com/attachments/1121098388583227554/1121843021894393926/image.psds.png')
    return exampleEmbed;
  }
  


export default async function info_usuario(interaction:CommandInteraction) {

    const Usuario:any = interaction.options.getUser('usuario')?.id;
    const Usuario_Member = interaction.guild?.members.fetch(Usuario)
    const Usuario_Member_UserName = (await Usuario_Member)?.user.username;
    const Usuario_Member_DisplayName = (await Usuario_Member)?.displayName;
    const Usuario_Member_Avatar_URL = (await Usuario_Member)?.displayAvatarURL();
    const Usuario_Member_ID = (await Usuario_Member)?.id;
    const Usuario_Member_Fecha_Ano = (await Usuario_Member)?.joinedAt?.getFullYear();
    const Usuario_Member_Fecha_Mes = (await Usuario_Member)?.joinedAt?.getMonth();
    const Usuario_Member_Fecha_Dia = (await Usuario_Member)?.joinedAt?.getDay();
    const Usuario_Member_HighestRole = (await Usuario_Member)?.roles.highest.id;


    console.log(Usuario_Member_Avatar_URL);
    await interaction.reply({embeds: [crearEmbed_Info_Usuario(Usuario_Member_UserName, Usuario_Member_ID, Usuario_Member_Avatar_URL, Usuario_Member_HighestRole, Usuario_Member_Fecha_Ano, Usuario_Member_Fecha_Mes, Usuario_Member_Fecha_Dia)]});
}