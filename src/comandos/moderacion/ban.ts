import dotenv from "dotenv";
import { CommandInteraction, Client, EmbedBuilder} from "discord.js";

dotenv.config();

function crearEmbedDeBan(UsuarioBaneadooID:any, razon:any,  usuarioQueBaneoID:any, usuarioQueBaneoName:any){
  const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('USUARIO BANEADO')
  // .setAuthor({ name: `${usuarioQueBaneoName}`, iconURL: 'https://cdn.discordapp.com/attachments/1121098388583227554/1156132480290656286/logo.png?ex=652e39c7&is=651bc4c7&hm=63146c440c3f0170f5d04b5123571f2f770e37967ffaae008108be317aacc73b&', url: 'https://discord.js.org' })
  .setDescription(`El usuario <@${UsuarioBaneadooID}> ha sido baneado`)
  .addFields({name: 'Autor de la sanción: ', value: `<@${usuarioQueBaneoID}>`})
  .addFields({name: 'Razón de la sanción: ', value: `${razon}`})
  .setTimestamp()

  return exampleEmbed;
}


export default async function banear(client:Client, interaction:CommandInteraction) {
    const usuarioABanear:any = interaction.options.get('id_usuario')?.value;
    const usuarioABanearRazon = interaction.options.get('razon')?.value;
    const usuarioABanearMensajes:any = interaction.options.get('Mensajes a eliminar')?.value;
    const usuarioABanearMember = await interaction.guild?.members.fetch(usuarioABanear)
    .then()
    .catch();


    const Bot = interaction.guild?.members.me;
    const BotRolMasAlto:any = Bot?.roles.highest.position

    const UsuarioQueEjecutoElComando = await interaction.guild?.members.fetch(interaction.user.id)
    const UsuarioQueEjecutoElComando_RolMasAlto:any = UsuarioQueEjecutoElComando?.roles.highest.position

    if (usuarioABanearMember?.id == UsuarioQueEjecutoElComando?.id){
      await interaction.reply('No te puedes banear a ti mismo.');
      return;
    }
    if (!UsuarioQueEjecutoElComando?.permissions.has('BanMembers')){
      await interaction.reply('No tienes permisos para banear usuarios.');
      return;
    }
    if (!interaction.appPermissions?.has('BanMembers')){
      await interaction.reply('No tengo permisos para banear usuarios.');
      return;
    }
    if (UsuarioQueEjecutoElComando_RolMasAlto > BotRolMasAlto){
      await interaction.reply('Ese usuario tiene un rol superior al tuyo, no lo puedes banear.');
      return;
    }
    if (usuarioABanearMember && usuarioABanearMember?.roles.highest.position > BotRolMasAlto){
      await interaction.reply('Ese usuario tiene un rol superior o al mismo nivel que al rol superior mio, no lo puedo banear.');
      return;
    }

    console.log(usuarioABanear)
    await interaction.reply({embeds: [crearEmbedDeBan(usuarioABanear, usuarioABanearRazon, UsuarioQueEjecutoElComando.id, UsuarioQueEjecutoElComando?.displayName)]})
    await interaction.guild?.bans.create(`${usuarioABanear}`, {reason: `${usuarioABanearRazon}`, deleteMessageSeconds: usuarioABanearMensajes})

  }

