module.exports = {
    name: 'ssprofile',
    description: 'show a players scoresaber info',
    args : false,
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any information, ${message.author}!`);
        }

        var userID = args[0];
        if (Number.isInteger(Number(userID))) {
          callAPIUserInfo(userID);
        } else {
          callAPIFindUser(args[0]);
        }

















// -------------------------------------------------------------------------

        var ssStatus;
        var ss;
        function callAPIUserInfo(ssID){
            console.log(Date.now() + ": Calling ScoreSaber API ID");
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
                 if (res.statusCode == 200) {
                 ssStatus = res.statusCode;
                 outEMBEDDATA();
                } else {
                   return message.channel.send("API Error - Try again.");
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




// ---------------------------------------------------------------------





















          var ssStatusp;
          var ssp;
          function callAPIFindUser(search){
            console.log(Date.now() + ": Calling ScoreSaber API Search");
            const http = require("https")
            http.request(
                {
                  hostname: "new.scoresaber.com",
                  path: "/api/players/by-name/" + search,
                },
                res => {
                  let data = ""
            
                  res.on("data", d => {
                    data += d
                  })
                  res.on("end", () => {
                   console.log(ssp = data);
                   console.log(Date.now() + ": Completed API Call, Status: " + res.statusCode);
                   if (res.statusCode == 200) {
                   ssStatusp = res.statusCode;
                   outEMBEDusDATA();
                  } else {
                      return message.channel.send("API Error - Try again.");
                  }
                  })
                })
              .end()
            }

            function outEMBEDusDATA() {
              const Discord = require('discord.js');
              const ssDatap = JSON.parse(ssp);
              var control;
              if (ssDatap.players.length <= 10) {
                control = ssDatap.players.length
              } else {
                control = 9;
              }

              var stringBuilder = "";
              for (let i = 0; i < control; i++) {
                stringBuilder = stringBuilder + "`#" + ssDatap.players[i].rank + " - " + ssDatap.players[i].playerName + " (" + ssDatap.players[i].playerId + ")`\n"
              }
  
              const searchEmbed = new Discord.MessageEmbed()
                .setColor('#ffde1a')
                .setTitle("ScoreSaber Player Search")
                .setURL('https://new.scoresaber.com/rankings/search/' + args[0])
                .setAuthor('ScoreSaber', 'https://scoresaber.com/imports/images/logo.ico', 'https://scoresaber.com')
                .setTimestamp()
                .setFooter("Choose your user ID and run !ssprofile <UserID>")
                .setDescription(stringBuilder);
              
              message.channel.send(searchEmbed);
            }  
    }
}

//