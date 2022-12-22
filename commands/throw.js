const { SlashCommandBuilder, MessageEmbed }  = require('discord.js');

// Collect Embed
const ThrowEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'You have thrown a snowball!',
	timestamp: new Date().toISOString(),
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("throw")
    .setDescription("Allows user to throw snowballs"),
    async execute(interaction) {
        const msg = ThrowEmbed;
        return interaction.reply({ embeds: [msg] });
    }
}
