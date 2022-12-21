const { SlashCommandBuilder, MessageEmbed }  = require('discord.js');

// Collect Embed
const CollectSuccessEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'You have thrown a snowball!',
	timestamp: new Date().toISOString(),
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("throw")
    .setDescription("Allows user to collect snowballs"),
    async execute(interaction) {
        const msg = CollectSuccessEmbed;
        return interaction.reply({ embeds: [msg] });
    }
}
