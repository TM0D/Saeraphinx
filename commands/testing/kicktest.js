module.exports = {
	name: 'kicktest',
	description: 'Tag a member and kick them (but not really).',
	args : true,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
//         "@TM0D, you need to tag a user in order to kick them!""
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick ${taggedUser.username}, but I'm kinda dumb and can't do that`);
	},
};