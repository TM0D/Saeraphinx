module.exports = {
    name: 'alliemap',
    aliases: ['clearly'],
    description: 'clearly you\'ve never played an allie_vr map',
    args : false,
    execute(message, args) {
        message.channel.send("",{files: ["clearly_allie.png", "clearly_allie.png"]})
    }
}