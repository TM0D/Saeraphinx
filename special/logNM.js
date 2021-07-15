const Discord = require('discord.js');

module.exports = {
	execute(message, webhook) {
        const embed = new Discord.MessageEmbed()
	.setTitle(message.content)
	.setColor('#0099ff')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTimestamp()
	.setFooter("USER ID: " + message.author.id, message.guild.iconURL());

		    webhook.send('', {
			username: 'MESSAGE',
			avatarURL: 'https://i.imgur.com/wSTFkRM.png',
			//files: message.attachements.get(MessageAttachment).url,
			embeds: [embed],
		});
	},
};