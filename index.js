const connect = require('connect');
const http = require('http');
const https = require('https');
const file = require('fs');
const requestIp = require('request-ip');
const redirect = require('connect-redirection')

const redirectURL = 'https://arrayinamatrix.xyz/res/site/images/trollface.gif'
if (process.argv[2] != undefined) {
    redirectURL = process.argv[2]
}
const logFile = 'ip-addresses.log'
const httpPort = 3030
const httpsPort = 3031

const options = {
    key: file.readFileSync('cert/key.pem'),
    cert: file.readFileSync('cert/cert.pem')
};

console.log(`Redirect: ${redirectURL}`);
console.log(`HTTP Port: ${httpPort}`)
console.log(`HTTPS Port: ${httpsPort}`)
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
https.createServer(options, app).listen(httpsPort);