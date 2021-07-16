const Discord = require('discord.js');

module.exports = {
	execute(message, webhook) {
        const embed = new Discord.MessageEmbed()
	.setDescription(message.content)
	.setTitle("URL to message")
	.setURL(message.url)
	.setColor('#0099ff')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTimestamp()
	.setFooter("User ID: " + message.author.id + " | Channel ID: " + message.channel, message.guild.iconURL());

		    webhook.send('', {
			username: 'MESSAGE',
			avatarURL: 'https://i.imgur.com/wSTFkRM.png',
			//files: message.attachements.get(MessageAttachment).url,
			embeds: [embed],
		});
	},
};