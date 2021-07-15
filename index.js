const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const webhookChannelID = '865275610439352372'
client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}.`);
	console.log('Ready!');
});

// -----
const NewMessageLogger = require(`./special/logNM.js`);
const DeletedMessageLogger = require(`./special/logDM.js`);

client.once('ready', async () => {
const hookChannel = client.channels.cache.get(webhookChannelID);
	const Testwebhooks = await hookChannel.fetchWebhooks();
	if (!Testwebhooks.first()) {
		hookChannel.createWebhook('Logger', {
		avatar: 'https://i.imgur.com/wSTFkRM.png',
	}).then(webhook => console.log(`Created webhook ${webhook}`))
	.catch(console.error); }
});

client.on('message', async message => {
	if (message.webhookID && message.channel.id == webhookChannelID) return;
	console.log(message.channel + " | " + message.author + ":  " + message.content);
	if (message.author.bot) return;
	if (!message.guild.available) return;
	const hookChannel = client.channels.cache.get(webhookChannelID);
	const logWebhooks = await hookChannel.fetchWebhooks();
	const logWebhook = logWebhooks.first();
	NewMessageLogger.execute(message, logWebhook);
});

client.on('messageDelete', async message => {
	if (message.webhookID && message.channel.id == webhookChannelID) return;
	console.log(message.channel + " | " + message.author + ":  " + message.content);
	if (message.author.bot) return;
	if (!message.guild.available) return;
	const hookChannel = client.channels.cache.get(webhookChannelID);
	const logWebhooks = await hookChannel.fetchWebhooks();
	const logWebhook = logWebhooks.first();
	DeletedMessageLogger.execute(message, logWebhook);
});
// -----



client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	if (message.webhookID) return;


	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);