const { SlashCommandBuilder }  = require('discord.js');

// Collect Embed
const StatsEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'These are your stats:',
    fields: []
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Allows user to view their stats"),
    async execute(interaction, user, client) {
        const msg = StatsEmbed;

        let snowballs = `Snowballs: ${user.snowballs}`
        let hits = `Hits: ${user.hits}`
        let kos = `KOs: ${user.kos}`
        let misses = `Misses: ${user.misses}`

        msg.description = [snowballs, hits, kos, misses].join('\n');
        return interaction.reply({ embeds: [msg] });
    }
}
