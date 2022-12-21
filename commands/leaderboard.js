const { SlashCommandBuilder, MessageEmbed }  = require('discord.js');

// Leaderboard Embed
const LeaderboardEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'You have collected a snowball',
    fields: [ {
        value: '1. ',
    }, 
    {
        value: '2. ',
    } ],
	timestamp: new Date().toISOString()
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Allows user to view the leaderboard"),
    async execute(interaction) {
        const msg = LeaderboardEmbed;
        return interaction.reply({ embeds: [msg] });
    }
}