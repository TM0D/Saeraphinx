const { mode, author, botAdmin, dev } = require("./../../config.json")

module.exports = {
	name: 'v',
	description: 'display version info',
    args : false,
	execute(message, args) { 
        if(message.author == author || message.author == botAdmin) {
            message.channel.send("Bot Admin:\nDEV MODE: `" + dev + "`\nINTENDED SERVER: `" + mode + "`")
        }
		switch (mode) {
            case 1:
                return message.channel.send("Saeraphinx Current Version: `CUTE v0.1`")
                break;
            case 0:
            default:
                return message.channel.send("Saeraphinx Current Version: `UNKNOWN` (dev version?)");
                break;
        }
	},
};