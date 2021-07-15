module.exports = {
	name: 'whois',
    aliases: ['id'],
	description: 'Tag a member and kick them (but not really).',
	args : false,
	execute(message) {
		if (!message.mentions.users.size) {
			
		}

		const taggedUser = message.mentions.users.first();
		console.log("cring");

        function displayWhoIs() {}
	},
};