module.exports = {
    name: 'lock',
    description: 'Locks current channel, or locks channel mentioned',
    args : false,
    execute(message, args) {
        var unlockedChannel;
        if (!args.length) {
            unlockedChannel = message.channel;
        } else {
            unlockedChannel = args[0];
        }

        unlockedChannel.updateOverwrite(unlockedChannel.guild.roles.everyone, { SEND_MESSAGES: false }, "Locked by " + message.author.username);
        return message.reply("Locked " + unlockedChannel)
    }
}