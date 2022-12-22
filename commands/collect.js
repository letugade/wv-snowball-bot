const { SlashCommandBuilder, MessageEmbed }  = require('discord.js');

// Leaderboard Embed
const CollectSuccessEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'You have collected a snowball',
	timestamp: new Date().toISOString(),
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("collect")
    .setDescription("Allows users to collect snowballs."),
    async execute(interaction) {
        const msg = CollectSuccessEmbed;
        return interaction.reply({ embeds: [msg] });
    }
}