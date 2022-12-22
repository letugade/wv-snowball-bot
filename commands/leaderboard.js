const { SlashCommandBuilder, MessageEmbed }  = require('discord.js');

// Leaderboard Embed
const LeaderboardEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'Top Snowballers:\n1.\n2.\n3.',
	timestamp: new Date().toISOString()
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Allows user to view the leaderboard"),
    async execute(interaction) {
        // This is how you reset the description
        // LeaderboardEmbed.description = "Hello";
        const msg = LeaderboardEmbed;
        return interaction.reply({ embeds: [msg] });
    }
}