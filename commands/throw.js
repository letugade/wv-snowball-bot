// TODO
// - Add Dodging
const { SlashCommandBuilder}  = require('discord.js');

// Throw Embed
const ThrowEmbed = {
	color: 0x0099ff,
	title: 'Snowball Bot',
	description: 'You have thrown a snowball!',
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
            msg = ThrowEmbed;
            // Target gets Hit
            user.hits += 1;
            user.snowballs -= 1;
            target.kos += 1;
            client.cooldowns.set(commandTarget.id, { cooldownStart: Date.now(), cooldownDuration: 60});
            msg.description = `You have thrown a snowball at ${commandTarget} and hit them!`;
        } else {
            msg = SelfThrowEmbed;
        }

        return interaction.reply({ embeds: [msg] });
    }
}
