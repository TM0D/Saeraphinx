const { TextChannel } = require("discord.js");

module.exports = {
    name: 'lock',
    description: 'Locks current channel, or locks channel mentioned',
    args : false,
    permissions : { MANAGE_CHANNEL: true },
    execute(message, args) {
        var unlockedChannel;
        if (!args.length) {
            unlockedChannel = message.channel;
        } else {
            lockedChannel = args[0];
        }



        unlockedChannel.updateOverwrite(unlockedChannel.guild.roles.everyone, { SEND_MESSAGES: false }, "Locked by " + message.author.username);
        return message.reply("Locked <#" + unlockedChannel + ">")
    }
}