import { Application, Client, CommandInteraction, Interaction, EmbedBuilder } from "discord.js";

function crearEmbedDeExpulsión(UsuarioExpulsadoID:any, razon:any,  usuarioQueExpulsoID:any, usuarioQueExpulsoName:any){
  const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('USUARIO EXPULSADO')
  // .setAuthor({ name: `${usuarioQueExpulsoName}`, iconURL: 'https://cdn.discordapp.com/attachments/1121098388583227554/1156132480290656286/logo.png?ex=652e39c7&is=651bc4c7&hm=63146c440c3f0170f5d04b5123571f2f770e37967ffaae008108be317aacc73b&', url: 'https://discord.js.org' })
  .setDescription(`El usuario <@${UsuarioExpulsadoID} ha sido expulsado>`)
  .addFields({name: 'Autor de la sanción: ', value: `<@${usuarioQueExpulsoID}>`})
  .addFields({name: 'Razón de la sanción: ', value: `${razon}`})
  .setTimestamp()

  return exampleEmbed;
}


export default async function kick(interaction:CommandInteraction){
  const usuarioAExpulsar_ID:any = interaction.options.get('usuario')?.value;
  const usuarioAExpulsar_Member = await interaction.guild?.members.fetch(usuarioAExpulsar_ID)
  const usuarioAExpulsar_Member_HighestRole:any = usuarioAExpulsar_Member?.roles.highest.position;
  const usuarioAExpulsar_Razon = interaction.options.get('razon')?.value

  const UsuarioQueEjecutoElComando_ID = interaction.user.id;
  const UsuarioQueEjecutoElComando_Member = await interaction.guild?.members.fetch(UsuarioQueEjecutoElComando_ID)
  const UsuarioQueEjecutoElComando_HighestRole:any = usuarioAExpulsar_Member?.roles.highest.position;

  const Bot_Member = interaction.guild?.members.me;
  const Bot_Member_HighestRole:any = Bot_Member?.roles.highest.position

  if (usuarioAExpulsar_ID == UsuarioQueEjecutoElComando_ID){
    await interaction.reply('No te puedes expulsar a ti mismo');
    return;
  }
  if (usuarioAExpulsar_Member_HighestRole > usuarioAExpulsar_Member_HighestRole){
    await interaction.reply('Ese usuario tiene un rol superior al tuyo, no lo puedes expulsar.');
    return;
  }
  if(usuarioAExpulsar_Member_HighestRole > Bot_Member_HighestRole){
    await interaction.reply('Ese usuario tiene un rol superior al mio, no lo puedo expulsar.');
    return;
  }
  if (!UsuarioQueEjecutoElComando_Member?.permissions.has('KickMembers')){
    await interaction.reply('No tienes permisos para expulsar usuarios');
    return;
  }
  if(!interaction.appPermissions?.has('KickMembers')){
    await interaction.reply('No tengo permisos para expulsar usuarios');
    return;
  }

  console.log(UsuarioQueEjecutoElComando_Member.displayName, usuarioAExpulsar_Member?.nickname)
  await interaction.channel?.send({embeds: [crearEmbedDeExpulsión(usuarioAExpulsar_Member?.id, usuarioAExpulsar_Razon, UsuarioQueEjecutoElComando_Member.id, UsuarioQueEjecutoElComando_Member?.displayName)]})
  usuarioAExpulsar_Member?.kick(`${usuarioAExpulsar_Razon}`);
}