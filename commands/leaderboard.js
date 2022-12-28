// TODO
const { SlashCommandBuilder }  = require('discord.js');

// Leaderboard Embed
const LeaderboardEmbed = {
	color: 0x0099ff,
	description: 'Top Snowballers:\n1.\n2.\n3.'
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Allows user to view the leaderboard"),
    async execute(interaction, users, client) {
        const msg = LeaderboardEmbed;
        let description = "";
        for (let i = 0; i < users.length; i++) {
            description = description + `${i+1}. <@${users[i].user_id}> (${users[i].hits}/${users[i].kos}/${users[i].misses})\n`;
        }
        msg.description = description;
        return interaction.reply({ embeds: [msg] });
    }
}