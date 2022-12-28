// TODO
// - Add Dodging
const { SlashCommandBuilder}  = require('discord.js');

// Throw Embed
const ThrowSuccessEmbed = {
	color: 0x61e765,
	description: 'You have thrown a snowball!',
    image: {
		url: 'https://raw.githubusercontent.com/letugade/wv-snowball-bot/main/images/throw.png',
	}
};

// Throw Embed
const ThrowEmptyEmbed = {
	color: 0x0099ff,
	description: 'You have no more snowballs! Type /collect for more.'
};

// Throw Embed
const ThrowFailEmbed = {
	color: 0xfba617,
	description: 'You have thrown a snowball!',
    image: {
		url: 'https://raw.githubusercontent.com/letugade/wv-snowball-bot/main/images/dodge.png',
	}
};


// Self Throw Embed
const SelfThrowEmbed = {
	color: 0x0099ff,
	description: 'You can\'t throw a snowball at yourself!'
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

        if (user.snowballs <= 0) {
            msg = ThrowEmptyEmbed;
        }
        // Make sure user can't throw snowballs at themselves
        else if (commandTarget.id !== interaction.user.id) {

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
                user.snowballs -= 1;
                user.misses += 1;
                msg.description = `You have thrown a snowball at ${commandTarget} and missed them! You now have ${user.snowballs} snowballs.`;
            }
        } else {
            msg = SelfThrowEmbed;
        }

        return interaction.reply({ embeds: [msg] });
    }
}
