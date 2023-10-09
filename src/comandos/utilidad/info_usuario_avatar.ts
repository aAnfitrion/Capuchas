import { EmbedBuilder, CommandInteraction, GuildMember } from "discord.js";

function crearEmbed_Info_Usuario_Avatar(Usuario_ID:any, Usuario_AvatarURL:any){
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Avatar de usuario')
    .setDescription(`Avatar del usuario <@${Usuario_ID}>`)
    .setImage(Usuario_AvatarURL)

    return exampleEmbed;
  }
  

  export default async function info_usuario_avatar(interaction:CommandInteraction) {

    const Usuario_Avatar:any = interaction.options.getUser('usuario')?.avatarURL();
    const Usuario_ID:any = interaction.options.getUser('usuario')?.id;


    await interaction.reply({embeds: [crearEmbed_Info_Usuario_Avatar(Usuario_ID, Usuario_Avatar)]});
}