import dotenv from "dotenv";
import { CommandInteraction, EmbedBuilder, Interaction, Message, User, GuildMemberRoleManager, Guild, Client, GuildMember } from "discord.js";

dotenv.config();

export default async function banear(client:Client, interaction:any) {
    const usuarioABanear:any = interaction.options.get('usuario')?.value;
    const usuarioABanearMember:GuildMember = await interaction.guild?.members.fetch(usuarioABanear)
    const usuarioABanearRolMasAlto = usuarioABanearMember.roles.highest.position

    const Bot = interaction.guild?.members.me;
    const BotRolMasAlto:any = Bot?.roles.highest.position

    const UsuarioQueEjecutoElComando_RolMasAlto = interaction.member?.roles.highest.position

    if (!interaction.appPermissions?.has('BanMembers')){
      await interaction.reply('No tengo permisos para banear usuarios');
      return;
    }
    if (UsuarioQueEjecutoElComando_RolMasAlto > BotRolMasAlto){
      await interaction.reply('Ese usuario tiene un rol superior al tuyo, no lo puedes banear.');
    }
    if (usuarioABanearRolMasAlto > BotRolMasAlto){
      await interaction.reply('Ese usuario tiene un rol superior o al mismo nivel que al rol superior mio, no lo puedo banear.');
      console.log(BotRolMasAlto)
      console.log(usuarioABanearRolMasAlto)
      return;
    }
    await usuarioABanearMember.ban();
    await interaction.reply(`Usuario ${usuarioABanear}`)

  }

