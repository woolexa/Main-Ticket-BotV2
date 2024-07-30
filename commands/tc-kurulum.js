const { Client, EmbedBuilder, ButtonBuilder, StringSelectMenuBuilder, ActionRowBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const discord = require("discord.js")
module.exports = {
    name: "ticket-kurulum",
    description: "Ticket mesajının kurulumu yap",
    type: 1,

    // 
    run: async (client, interaction) => {

        const yetki = new EmbedBuilder()
        .setColor("Red")
        .setDescription("❌ | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true }) 

        const basarili = new EmbedBuilder()
        .setTitle("Başarılı")


        const ticketSystemEmbed = new EmbedBuilder()
        .setColor("DarkBlue")
        .setAuthor({name: `WOOLEXA - Ticket Sistemi`, iconURL: interaction.guild.iconURL({ dynamic: true}) })
        .setDescription(`
        **Merhaba, ${interaction.guild.name} üyeleri!**
        
        :ticket: **Ticket Oluşturma**:
        Aşağıdaki butona tıklayarak destek talebi oluşturabilirsiniz. Destek talepleriniz için lütfen uygun kategoriyi seçiniz:
        
        :clipboard: **Destek Kategorileri**:
        \`In Character\`, \`Out Of Character\`, \`Şikayet\`
        
        **:link: Linkler**:
        [Discord](https://discord.gg/sectwist) , [Github](https://github.com/woolexa)
        `)
        .setImage('https://cdn.discordapp.com/attachments/1248877690891796511/1267933824101384313/standard.gif?ex=66aa96e4&is=66a94564&hm=a15f7fb7f96ae048cf36ea890db6ef51e57972502a41c3e941e36a58384f87b9&') 
        .setFooter({text: 'Developed By Woolexa'}) 


        const kategoriseç = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(`kategorisec`)
                .setPlaceholder('ɴᴀsɪʟ ʏᴀʀᴅɪᴍᴄɪ ᴏʟᴀʙɪ̇ʟɪ̇ʀɪ̇ᴢ?')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "ɪᴄ ᴅᴇsᴛᴇᴋ",
                        emoji: "1221160978851561544",
                        value: "icdestek"
                    },
                    {
                      label: "ᴏᴄᴄ ᴅᴇsᴛᴇᴋ",
                      emoji: "1221160976439705641",
                      value: "occdestek"
                  },
                  {
                      label: "şɪᴋᴀʏᴇᴛ ᴅᴇsᴛᴇᴋ",
                      emoji: "1221371710524362763",
                      value: "sikayet"
                  },
                  {
                      label: "sᴇᴄɪᴍɪ ɪᴘᴛᴀʟ ᴇᴛ",
                      emoji: "1259569502929289298",
                      value: "seçimiptal"
                  }
                ]));

        interaction.reply({ embeds: [ticketSystemEmbed], components: [kategoriseç]})

    }
}