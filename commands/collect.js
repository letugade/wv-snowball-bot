const { SlashCommandBuilder }  = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("collect")
    .setDescription("Allows user to collect snowballs"),
    async execute(interaction) {
        await interaction.reply("You have collected a snowball!");
    }
}
