const connect = require('connect');
const http = require('http');
const file = require('fs');
const requestIp = require('request-ip');
const redirect = require('connect-redirection')

let redirectURL = 'https://arrayinamatrix.xyz/res/site/images/trollface.gif'
if (process.argv[2] != undefined) {
    redirectURL = process.argv[2]
}
let logFile = 'ip-addresses.log'
let httpPort = 3030

console.log(`Redirect: ${redirectURL}`);
console.log(`Port: ${httpPort}`)
console.log(`Log file location: ${logFile}`)
console.log("########## IP LOGGER STARTED ##########");

const app = connect()
    .use(requestIp.mw())
    .use(redirect())
    .use(function (req, res) {
        res.redirect(redirectURL)

        let time = new Date();
        let ip = req.clientIp;
        let output = time.getFullYear() + "-" + ("0" + (time.getMonth() + 1)).slice(-2) + "-" + ("0" + time.getDate()).slice(-2) + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " >> " + ip.slice(7);

        console.log(output);
        try {
            file.accessSync(logFile, file.constants.R_OK | file.constants.W_OK)
            file.appendFile(logFile, output + '\n', (e) => {
                if (e != null) {
                    console.log(e)
                }
            });

        } catch (error) {
            file.writeFile(logFile, output + '\n', (e) => {
                if (e != null) {
                    console.log(e)
                }
            });
        }
    });

http.createServer(app).listen(httpPort);
