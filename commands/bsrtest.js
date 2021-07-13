module.exports = {
	name: 'bsr',
	description: 'Open OneClick w/ BSR',
	execute(message, args) {
        const open = require('open');
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}  

        open("beatsaver://" + args[0]);
		message.channel.send(`Opened ` + args[0] + ` on host PC.`);
	},
};