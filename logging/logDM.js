const Discord = require('discord.js');

module.exports = {
	execute(message, webhook) {
        const embed = new Discord.MessageEmbed()
	.setDescription(message.content)
	.setColor('#FF0000')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTimestamp()
	.setFooter("USER ID: " + message.author.id + " | Channel ID: " + message.channel, message.guild.iconURL());

		    webhook.send('', {
			username: 'DELETED MESSAGE',
			avatarURL: 'https://i.imgur.com/wSTFkRM.png',
			embeds: [embed],
		});
	},
};