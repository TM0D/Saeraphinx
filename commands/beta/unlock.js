module.exports = {
    name: 'unlock',
    description: 'Unlocks current channel, or unlocks channel mentioned',
    args : false,
    permissions : { MANAGE_CHANNEL: true },
    execute(message, args) {
        var lockedChannel;
        if (!args.length) {
            lockedChannel = message.channel;
        } else {
            lockedChannel = args[0];
        }

        lockedChannel.updateOverwrite(lockedChannel.guild.roles.everyone, { SEND_MESSAGES: true }, "Unlocked by " + message.author.username);
        return message.reply("Unlocked <#" + lockedChannel + ">")
    }
}