// TODO
// - Move to config.json, might making setup a lot easier.
// - Dockerfile to automate setup

const {DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = require("./config.json"); 
const fs = require('node:fs');
const path = require('node:path');
const {Client, Events, Collection, GatewayIntentBits} = require('discord.js'); //import discord.js
const token = String(DISCORD_TOKEN);

// Enable all intents, need to research more how to restrict this
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// Setup Commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
    // client.channels.cache.get("1055166891645210637").send("Snowball Time!");
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);