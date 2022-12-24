const { SlashCommandBuilder }  = require('discord.js');

// Collect Embed
const StatsEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'These are your stats:',
	timestamp: new Date().toISOString(),
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Allows user to collect snowballs"),
    async execute(interaction) {
        const msg = StatsEmbed;
        return interaction.reply({ embeds: [msg] });
    }
}
