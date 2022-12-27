// Mostly Done
const { SlashCommandBuilder }  = require('discord.js');
const {connect} = require("mongoose");
const {DATABASE_TOKEN} = require("../config.json");

// Collect Successful
const CollectSuccessEmbed = {
	color: 0x6062e3,
	title: 'Snowball Bot',
	description: 'You have collected a snowball',
    image: {
		url: 'https://raw.githubusercontent.com/letugade/wv-snowball-bot/main/images/collect.png',
	},
	timestamp: new Date().toISOString()
};

// Collect Successful
const CollectFailEmbed = {
	color: 0x6062e3,
	title: 'Snowball Bot',
	description: `Please wait to collect a snowball`,
	timestamp: new Date().toISOString()
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("collect")
        .setDescription("Allows users to collect snowballs."),
    async execute(interaction, user, client) {
        var msg = null;
        const userId = interaction.user.id;
        var cooldowns = client.cooldowns;

        if (cooldowns.has(userId)) {
            var now = Date.now();
            var cooldownData = cooldowns.get(userId);
            var cooldownStart = cooldownData["cooldownStart"];
            var cooldownDuration = cooldownData["cooldownDuration"];

            // Milliseconds to seconds
            var cooldownTime = Math.ceil((now - cooldownStart) / 1000);

            // Cooldown Check
            if (cooldownTime < cooldownDuration) {
                msg = CollectFailEmbed;
                msg.description = `Please wait ${cooldownDuration - cooldownTime} seconds to collect a snowball`;
            } else {
                msg = CollectSuccessEmbed;
                user.snowballs += 1;
                cooldowns.set(userId, {cooldownStart: Date.now(), cooldownDuration: 30});
            }
        } else {
            msg = CollectSuccessEmbed;
            user.snowballs += 1;
            cooldowns.set(userId, {cooldownStart: Date.now(), cooldownDuration: 30});
        }

        console.log("cooldown: " + cooldownTime);
        return interaction.reply({ embeds: [msg] });
    }
}