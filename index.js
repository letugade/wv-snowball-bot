// TODO
// - Move to config.json, might making setup a lot easier.
// - Dockerfile to automate setup

const fs = require('fs');
const path = require('path');
const {Client, Events, Collection, GatewayIntentBits } = require('discord.js'); //import discord.js
const { connect } = require('mongoose');
require('dotenv').config();

const Stats = require(`./models/Stats`);

const token = String(process.env.DISCORD_TOKEN);
const databaseToken = String(process.env.DATABASE_TOKEN);

// Enable all intents, need to research more how to restrict this
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// Setup Commands
client.commands = new Collection();

// Setup client variables
client.cooldowns = new Map();

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

	// console.log(interaction);

    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

try {
		var query, update, options
		var user, target

		// Update db after command is called
		query = { user_id: interaction.user.id, guild_id: interaction.guildId },
		update = {},
		options = { upsert: true, new: true, setDefaultsOnInsert: true };
		user = await Stats.findOneAndUpdate(query, update, options);

		switch (interaction.commandName) {
			case "throw":
				query = { user_id: interaction.options.getUser('target').id, guild_id: interaction.guildId },
				update = {},
				options = { upsert: true, new: true, setDefaultsOnInsert: true };
				target = await Stats.findOneAndUpdate(query, update, options);
				await command.execute(interaction, user, target, client);
				target.save();
				break;
			case "leaderboard":
				var users = await Stats.find({}).sort({hits: -1, kos: 1, misses: 1}).limit(10);
				await command.execute(interaction, users, client);
				break;
			default:
				await command.execute(interaction, user, client);
				break;
		}

		user.save();
		console.log(user);

	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
connect(databaseToken, {dbName: "snowballdb", autoCreate: true});
console.log("Database Connected");




