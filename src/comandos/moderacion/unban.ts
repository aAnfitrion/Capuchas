import { Interaction, CommandInteraction, GuildMember, Guild, EmbedBuilder } from "discord.js";

function crearEmbedDeBan(UsuarioDesbaneadoID:any, razon:any,  usuarioQueDesbaneoID:any){
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('USUARIO DESBANEADO')
    // .setAuthor({ name: `${usuarioQueBaneoName}`, iconURL: 'https://cdn.discordapp.com/attachments/1121098388583227554/1156132480290656286/logo.png?ex=652e39c7&is=651bc4c7&hm=63146c440c3f0170f5d04b5123571f2f770e37967ffaae008108be317aacc73b&', url: 'https://discord.js.org' })
    .setDescription(`El usuario <@${UsuarioDesbaneadoID}> ha sido desbaneado`)
    .addFields({name: 'Autor del desbaneo ', value: `<@${usuarioQueDesbaneoID}>`})
    .addFields({name: 'Razón del desbaneo: ', value: `${razon}`})
    .setTimestamp()
  
    return exampleEmbed;
  }
  

export async function unban(interaction:CommandInteraction) {
    const usuarioADesbanear_ID:any = interaction.options.get('id_usuario')?.value;
    const usuarioADesbanear_Razón = interaction.options.get('razon')?.value;
    const usuarioADesbanear_Member = await interaction.guild?.bans.fetch(usuarioADesbanear_ID)
    .then()
    .catch();

    const UsuarioQueEjecutoElComando_Member = await interaction.guild?.members.fetch(interaction.user.id)
    if (!UsuarioQueEjecutoElComando_Member?.permissions.has('BanMembers')){
        await interaction.reply('No tienes permisos para desbanear usuarios.');
        return;
    }
    if (!usuarioADesbanear_Member){
        await interaction.reply('Ese usuario no existe o no esta baneado');
        return;
    }

    const UsuarioQueDesbaneo_ID = interaction.user.id;
    await interaction.reply({embeds: [crearEmbedDeBan(usuarioADesbanear_ID, usuarioADesbanear_Razón, UsuarioQueDesbaneo_ID)]})
    interaction.guild?.members.unban(`${usuarioADesbanear_ID}`);
}