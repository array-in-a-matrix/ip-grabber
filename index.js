const connect = require('connect');
const http = require('http');
const file = require('fs');
const requestIp = require('request-ip');
const redirect = require('connect-redirection')

let redirectURL = 'https://arrayinamatrix.xyz'
if (process.argv[2] != undefined) {
    redirectURL = process.argv[2]
}

let httpPort = 3030
console.log(`Redirect: ${redirectURL}`);
console.log(`Port: ${httpPort}`)
console.log("########## IP LOGGER STARTED ##########");

const app = connect()
    .use(requestIp.mw())
    .use(redirect())
    .use(function (req, res) {
        res.redirect(redirectURL)

        let time = new Date();
        let ip = req.clientIp;
        let output = time.getFullYear() + "-" + ("0" + (time.getMonth() + 1)).slice(-2) + "-" + ("0" + time.getDate()).slice(-2) + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ">> " + ip;

        console.log(output);
        file.appendFile("/matrix/nginx-proxy/data/matrix-domain/server/ip-grabber/ip-addresses.log", output + '\n', (e) => {
            if (e) {
                console.log(e);
            };
        });
    });

http.createServer(app).listen(httpPort);