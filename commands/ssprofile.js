module.exports = {
    name: 'ss',
    description: 'show a players scoresaber info',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }



        callAPI(args[0]);



        var ssStatus;
        var ss;
        function callAPI(ssID){
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
                 outDATA();
                } else {
                  console.log("No Response, holding data and waiting.");
                }
                })
              })
            .end()
          }

          function outRAWDATA() {
            return message.channel.send(`STATUS CODE: ` + ssStatus + `\nSCORESABER JSON: \n${ss}`);
          }
    }
}
