// TODO
// - Add Dodging
const { SlashCommandBuilder}  = require('discord.js');

// Throw Embed
const ThrowSuccessEmbed = {
	color: 0x61e765,
	title: 'Snowball Bot',
	description: 'You have thrown a snowball!',
    image: {
		url: 'https://raw.githubusercontent.com/letugade/wv-snowball-bot/main/images/throw.png',
	},
	timestamp: new Date().toISOString(),
};

// Throw Embed
const ThrowFailEmbed = {
	color: 0xfba617,
	title: 'Snowball Bot',
	description: 'You have thrown a snowball!',
    image: {
		url: 'https://raw.githubusercontent.com/letugade/wv-snowball-bot/main/images/dodge.png',
	},
	timestamp: new Date().toISOString(),
};


// Self Throw Embed
const SelfThrowEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'You can\'t throw a snowball at yourself!',
	timestamp: new Date().toISOString(),
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName("throw")
    .setDescription("Allows user to throw snowballs")
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The person you want to throw the snowball at!')
                .setRequired(true)),
    async execute(interaction, user, target, client) {
        let msg = null;
        // Keep it local to make it easier
        let commandTarget = interaction.options.getUser('target');

        // Make sure user can't throw snowballs at themselves
        if (commandTarget.id !== interaction.user.id) {

            const dodge = Math.round(Math.random());
            // Target gets Hit
            if (dodge === 0) {
                user.hits += 1;
                user.snowballs -= 1;
                target.kos += 1;
                target.snowballs = 0;
                client.cooldowns.set(commandTarget.id, { cooldownStart: Date.now(), cooldownDuration: 60});
                msg = ThrowSuccessEmbed;
                msg.description = `You have thrown a snowball at ${commandTarget} and hit them! You now have ${user.snowballs} snowballs.`;
            } else {
                msg = ThrowFailEmbed;
                msg.description = `You have thrown a snowball at ${commandTarget} and missed them! You now have ${user.snowballs} snowballs.`;
            }
        } else {
            msg = SelfThrowEmbed;
        }

        return interaction.reply({ embeds: [msg] });
    }
}
