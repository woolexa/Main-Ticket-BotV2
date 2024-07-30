// Discord
const { PermissionsBitField, StringSelectMenuBuilder, AuditLogEvent, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder} = require("discord.js");
// İNTENTS
const client = new Client({ intents: Object.values(GatewayIntentBits), shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,] });
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const config = require("./config.json");
const moment = require("moment");
const mongoConnect = require("./utils/mongoConnect.js")
require("moment-duration-format");
moment.locale('tr')
// Database
mongoConnect()
const WoolexaTheGuardian = require("./models/ticket_sistemi_sema.js")

//Slash Commands Register\\
global.config = config;
global.client = client;
client.setMaxListeners(0);
client.commands = (global.commands = []);
const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    if(props.type == 2 || props.type == 3) {
        client.commands.push({
                name: props.name.toLowerCase(),
                type: props.type
        })
        
        } else {
        client.commands.push({
                name: props.name.toLowerCase(),
                description: props.description,
                options: props.options,
                dm_permission: false,
                type: props.type || 1
            });
        }

    console.log(`[Command] ${props.name} komutu yüklendi.`)

});

readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

process.on("unhandledRejection", (reason, p) => {
    console.log(" [Error] :: Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [Error] :: Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [Error] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});

client.on("interactionCreate", async (interaction) => {

  const destektalebikontrol = new ActionRowBuilder()
  .addComponents(
    new StringSelectMenuBuilder()
    .setCustomId(`destekyönet`)
    .setPlaceholder('ᴅᴇsᴛᴇᴋ ᴛᴀʟᴇʙɪ̇ɴᴇ ᴜʏɢᴜʟᴀᴍᴀᴋ ɪ̇sᴛᴇᴅɪ̇ɢ̆ɪ̇ɴɪ̇ᴢ ɪ̇şʟᴇᴍɪ̇ sᴇᴄ̧ɪ̇ɴ̧')
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions([
      {
          label: "Desteği kapat",
          description: "Destek talebini mesajları kaydedip kapatır",
          emoji: "1259537125674844274",
          value: "destektalebinikapat"
      },

      {
          label: "Destek Yedeği",
          description: "Destek yedeği al!",
          emoji: "1221160970525868102",
          value: "destekyedegi"
      },
      {
          label: "Seçimi İptal Et",
          description: "Yapmış olduğun seçimi iptal et",
          emoji: "1259569502929289298",
          value: "seçimiptal"
      }
          
          
  ]));
          
  let date = new Date();
  
  let trDate = date.toLocaleDateString("tr-TR", {
      "month": "long",
      "year": "numeric",
      "day": "numeric"
  });

  if (interaction.values == 'icdestek') {

    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: Discord.ChannelType.GuildText,
      parent: config.TicketKategori,
      topic: `Selam Destek Talebini Başarıyla oluşturdun | İc Destek kategorisinde ${interaction.user.username} tarafından oluşturuldu.`,
      permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
           {
            id: interaction.user.id,
            allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
          {
           id: config.YetkiliRolü,
           allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
        ],
    });

    const tickecreatembed = new EmbedBuilder()
    .setColor("DarkButNotBlack")
    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
    .setAuthor({ name: `WOOLEXA - DESTEK SİSTEMİ`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setDescription(`
    ♥ ・ Bir Kullanıcı Destek Talebi Oluşturdu !.
    
    ❗ ・ Sunucumuza hoş geldin. Lütfen yetkililerimizin size geri dönüş yapmasını beklemeden sorununuzu anlatırmısınız?

    🔒・ \`ᴅᴇsᴛᴇɢɪɴ ᴋᴏɴᴜsᴜ:\` İc Destek
    
    🙋‍♂️ ・ \`ᴅᴇꜱᴛᴇᴋ ᴀᴄᴀɴ:\` <@${interaction.user.id}>
    🕗 ・ \`ᴛᴀʀıʜ: ${trDate} ${date.getHours()}:${date.getMinutes()}\``)
    .setImage(`https://cdn.discordapp.com/attachments/1248877690891796511/1267933824101384313/standard.gif?ex=66aa96e4&is=66a94564&hm=a15f7fb7f96ae048cf36ea890db6ef51e57972502a41c3e941e36a58384f87b9&`)

    const ticketolusturdun = new EmbedBuilder()
    .setAuthor({name: `ᴡᴏᴏʟᴇxᴀ - ᴅᴇsᴛᴇᴋ sɪsᴛᴇᴍɪ`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setDescription(`
    ☕ ・ \`ᴅᴇsᴛᴇᴋ ᴀᴄᴀɴ:\` <@${interaction.user.id}>
    🔒 ・ \`ᴅᴇsᴛᴇᴋ ᴋᴀɴᴀʟı:\` ${channel}
    🕗 ・ \`ᴛᴀʀɪʜ: ${trDate} ${date.getHours()}:${date.getMinutes()}\``)

    channel.send({ embeds: [tickecreatembed], components: [destektalebikontrol] })
    channel.send({content:`<@${interaction.user.id}>`}).then(x => setTimeout(() => x.delete(), 500));
    interaction.reply({ embeds: [ticketolusturdun], ephemeral: true })

    const YeniBirTicketVakası = new WoolexaTheGuardian ({
      kullanıcıid: interaction.user.id,
      date: Date.now(),
      odanınismi: `ticket-${interaction.user.username}`,
    });

    YeniBirTicketVakası.save()

  }

  if (interaction.values == 'occdestek') {

    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: Discord.ChannelType.GuildText,
      parent: config.TicketKategori,
      topic: `Selam Destek Talebini Başarıyla oluşturdun | OCC Destek kategorisinde ${interaction.user.username} tarafından oluşturuldu.`,
      permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
           {
            id: interaction.user.id,
            allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
          {
           id: config.YetkiliRolü,
           allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
        ],
    });

    const tickecreatembed = new EmbedBuilder()
    .setColor("DarkButNotBlack")
    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
    .setAuthor({ name: `WOOLEXA - DESTEK SİSTEMİ`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setDescription(`
    ♥ ・ Bir Kullanıcı Destek Talebi Oluşturdu !.
    
    ❗ ・ Sunucumuza hoş geldin. Lütfen yetkililerimizin size geri dönüş yapmasını beklemeden sorununuzu anlatırmısınız?

    🔒・ \`ᴅᴇsᴛᴇɢɪɴ ᴋᴏɴᴜsᴜ:\` OCC Destek
    
    🙋‍♂️ ・ \`ᴅᴇꜱᴛᴇᴋ ᴀᴄᴀɴ:\` <@${interaction.user.id}>
    🕗 ・ \`ᴛᴀʀıʜ: ${trDate} ${date.getHours()}:${date.getMinutes()}\``)
    .setImage(`https://cdn.discordapp.com/attachments/1248877690891796511/1267933824101384313/standard.gif?ex=66aa96e4&is=66a94564&hm=a15f7fb7f96ae048cf36ea890db6ef51e57972502a41c3e941e36a58384f87b9&`)

    const ticketolusturdun = new EmbedBuilder()
    .setAuthor({name: `ᴡᴏᴏʟᴇxᴀ - ᴅᴇsᴛᴇᴋ sɪsᴛᴇᴍɪ`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setDescription(`
    ☕ ・ \`ᴅᴇsᴛᴇᴋ ᴀᴄᴀɴ:\` <@${interaction.user.id}>
    🔒 ・ \`ᴅᴇsᴛᴇᴋ ᴋᴀɴᴀʟı:\` ${channel}
    🕗 ・ \`ᴛᴀʀɪʜ: ${trDate} ${date.getHours()}:${date.getMinutes()}\``)

    channel.send({ embeds: [tickecreatembed], components: [destektalebikontrol] })
    channel.send({content:`<@${interaction.user.id}>`}).then(x => setTimeout(() => x.delete(), 500));
    interaction.reply({ embeds: [ticketolusturdun], ephemeral: true })

    const YeniBirTicketVakası = new WoolexaTheGuardian ({
      kullanıcıid: interaction.user.id,
      date: Date.now(),
      odanınismi: `ticket-${interaction.user.username}`,
    });

    YeniBirTicketVakası.save()

  }

  if (interaction.values == 'sikayet') {

    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: Discord.ChannelType.GuildText,
      parent: config.TicketKategori,
      topic: `Selam Destek Talebini Başarıyla oluşturdun | Sikayet Destek kategorisinde ${interaction.user.username} tarafından oluşturuldu.`,
      permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
           {
            id: interaction.user.id,
            allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
          {
           id: config.YetkiliRolü,
           allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
          },
        ],
    });

    const tickecreatembed = new EmbedBuilder()
    .setColor("DarkButNotBlack")
    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
    .setAuthor({ name: `WOOLEXA - DESTEK SİSTEMİ`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setDescription(`
    ♥ ・ Bir Kullanıcı Destek Talebi Oluşturdu !.
    
    ❗ ・ Sunucumuza hoş geldin. Lütfen yetkililerimizin size geri dönüş yapmasını beklemeden sorununuzu anlatırmısınız?

    🔒・ \`ᴅᴇsᴛᴇɢɪɴ ᴋᴏɴᴜsᴜ:\` Şikayet Destek
    
    🙋‍♂️ ・ \`ᴅᴇꜱᴛᴇᴋ ᴀᴄᴀɴ:\` <@${interaction.user.id}>
    🕗 ・ \`ᴛᴀʀıʜ: ${trDate} ${date.getHours()}:${date.getMinutes()}\``)
    .setImage(`https://cdn.discordapp.com/attachments/1248877690891796511/1267933824101384313/standard.gif?ex=66aa96e4&is=66a94564&hm=a15f7fb7f96ae048cf36ea890db6ef51e57972502a41c3e941e36a58384f87b9&`)

    const ticketolusturdun = new EmbedBuilder()
    .setAuthor({name: `ᴡᴏᴏʟᴇxᴀ - ᴅᴇsᴛᴇᴋ sɪsᴛᴇᴍɪ`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setDescription(`
    ☕ ・ \`ᴅᴇsᴛᴇᴋ ᴀᴄᴀɴ:\` <@${interaction.user.id}>
    🔒 ・ \`ᴅᴇsᴛᴇᴋ ᴋᴀɴᴀʟı:\` ${channel}
    🕗 ・ \`ᴛᴀʀɪʜ: ${trDate} ${date.getHours()}:${date.getMinutes()}\``)

    channel.send({ embeds: [tickecreatembed], components: [destektalebikontrol] })
    interaction.reply({ embeds: [ticketolusturdun], ephemeral: true })

    const YeniBirTicketVakası = new WoolexaTheGuardian ({
      kullanıcıid: interaction.user.id,
      date: Date.now(),
      odanınismi: `ticket-${interaction.user.username}`,
    });

    YeniBirTicketVakası.save()

    channel.send({content:`<@${interaction.user.id}>`}).then(x => setTimeout(() => x.delete(), 500));

  }

  if (interaction.values == 'seçimiptal') {
    woolexasecim = new EmbedBuilder()
    .setAuthor({name: `Seçim iptal edildi`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Hey yapmış olduğun seçimi iptal ettin`)
    .setTimestamp()
    await interaction.reply({embeds: [woolexasecim], ephemeral: true})
  }

  if (interaction.values == 'destekyedegi') {

    const d = await WoolexaTheGuardian.findOne({ odanınismi: interaction.channel.name });
  
    let mesaj = interaction.channel.messages.cache.filter(x => !x.author.bot).map(x => `${x.author.tag} : ${x.content}`).join("\n");
    await interaction.reply({files: [{attachment: Buffer.from(mesaj) , name: `${d.kullanıcıid}-destek-talebi.txt`}], ephemeral: true})
  }

  if (interaction.values == 'destektalebinikapat') {

    const woolexauserbilgileri = await WoolexaTheGuardian.findOne({ odanınismi: interaction.channel.name });
    const adam = interaction.guild.members.cache.get(woolexauserbilgileri.kullanıcıid);
    

    const tarih = Date.now() - woolexauserbilgileri.date

    const logmesaj = new EmbedBuilder()
    .setAuthor({ name: `Woolexa Destek Sistemi Log Verileri`, iconURL: adam.user.displayAvatarURL({ dynamic: true }) })
    .setTitle("**Bir Destek Talebi Kapatıldı!**")
    .setDescription(`
    ☕ **»** \`ᴅᴇsᴛᴇɢ̆ɪ ᴋᴀᴘᴀᴛᴀɴ ʏᴇᴛᴋɪʟɪ\`: <@${interaction.user.id}>
    
    🕺 **»** \`ᴅᴇsᴛᴇɢ̆ɪ ᴏʟᴜşᴛᴜʀᴀɴ ᴋɪşɪ\`: <@${woolexauserbilgileri.kullanıcıid}>
    
    **» DESTEK KANALINI ⇓**\n\`\`\`ansi\n[2;34m${woolexauserbilgileri.odanınismi}[0m\`\`\`
    **» DESTEK ACILMA - KAPATILMA ⇓**\n\`\`\`ansi\n[2;34m${moment(woolexauserbilgileri.date).locale('tr').format('D MMMM YYYY HH:mm')} - ${moment(Date.now()).locale('tr').format('D MMMM YYYY HH:mm')}\nᴅᴇsᴛᴇᴋ sᴜʀᴇsɪ: ${moment.duration(tarih).format("H [saat], m [dakika] s [saniye]")}[0m\`\`\`
    `)
    .setFooter({text: `Developed By Woolexa`})

    const destekkapatıldı = new EmbedBuilder()
    .setColor("DarkRed")
    .setTitle("Destek talebi kapatılıyor")
    .setDescription(`
    Destek talebi 5 saniye içerisinde silinecektir
    Silen Yetkili: <@${interaction.user.id}>`)
    .setTimestamp()
                                                  
  await interaction.reply({ embeds: [destekkapatıldı] })
  let mesaj = interaction.channel.messages.cache.filter(x => !x.author.bot).map(x => `${x.author.tag} : ${x.content}`).join("\n");
  await client.channels.cache.get(config.LogTicket).send({embeds: [logmesaj]})
  await client.channels.cache.get(config.LogTicket).send({ files: [{attachment: Buffer.from(mesaj) , name: `${woolexauserbilgileri.odanınismi}-destek-talebi.txt`}]})
  
  interaction.channel.setName(`ᴅᴇsᴛᴇᴋ-ᴋᴀᴘᴀᴛıʟıʏᴏʀ`)

  setTimeout(() => {
    interaction.channel.delete();

  }, 5000);

  }
})