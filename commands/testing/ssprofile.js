module.exports = {
    name: 'ss',
    description: 'show a players scoresaber info',
    args : true,
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any information, ${message.author}!`);
        }


        userID = args[0];


        callAPIUserInfo(args[0]);


// -------------------------------------------------------------------------

function callAPISearchUser(search){
    console.log(Date.now() + ": Calling ScoreSaber API");
  const http = require("https")
  http.request(
      {
        hostname: "new.scoresaber.com",
        path: "/api/players/by-name" + search,
      },
      res => {
        let data = ""
  
        res.on("data", d => {
          data += d
        })
        res.on("end", () => {
         console.log(ss = data);
         console.log(Date.now() + ": Completed API Call, Status: " + res.statusCode);
         if (res.statusCode = 200) {
         ssStatus = res.statusCode;
         outEMBEDDATA();
        } else {
            message.channel.send("API Error - Try again.");
        }
        })
      })
    .end()
  }







        var ssStatus;
        var ss;
        function callAPIUserInfo(ssID){
            console.log(Date.now() + ": Calling ScoreSaber API (callAPI())");
          const http = require("https")
          http.request(
              {
                hostname: "new.scoresaber.com",
                path: "/api/player/" + ssID + "/full",
              },
              res => {
                let data = ""
          
                res.on("data", d => {
                  data += d
                })
                res.on("end", () => {
                 console.log(ss = data);
                 console.log(Date.now() + ": Completed API Call, Status: " + res.statusCode);
                 if (res.statusCode = 200) {
                 ssStatus = res.statusCode;
                 outEMBEDDATA();
                } else {
                    message.channel.send("API Error - Try again.");
                }
                })
              })
            .end()
          }

          function outRAWDATA() {
            return message.channel.send(`STATUS CODE: ` + ssStatus + `\nSCORESABER JSON: \n${ss}`);
          }


          function outEMBEDDATA() {
            const Discord = require('discord.js');
              const ssData = JSON.parse(ss);
            let ssAcc = ssData.scoreStats.averageRankedAccuracy;
            ssAcc = ssAcc * 1000;
            ssAcc = (parseInt(ssAcc)) / 1000

            const exampleEmbed = new Discord.MessageEmbed()
            	.setColor('#ffde1a')
            	.setTitle(ssData.playerInfo.playerName)
            	.setURL('https://new.scoresaber.com/u/' + ssData.playerInfo.playerId)
            	.setAuthor('ScoreSaber', 'https://scoresaber.com/imports/images/logo.ico', 'https://scoresaber.com')
            	.setThumbnail('https://new.scoresaber.com' + ssData.playerInfo.avatar)
            	.addFields(
            		{ name: 'Global Rank', value: '#' + ssData.playerInfo.rank, inline: true },
            		{ name: 'Country Rank', value: '#' + ssData.playerInfo.rank, inline: true },
                    { name: 'Preformance Points', value: ssData.playerInfo.pp + "pp", inline: true },
                    { name: 'Total Play Count', value: ssData.scoreStats.totalPlayCount, inline: true },
            		{ name: 'Ranked Play Count', value: ssData.scoreStats.rankedPlayCount, inline: true },
                    { name: 'Average Ranked Accuracy', value: ssAcc + "%", inline: true },
            	)
            	.setTimestamp()
            	.setFooter('User ID: ' + ssData.playerInfo.playerId);
            
            message.channel.send(exampleEmbed);
          }
    }
}
