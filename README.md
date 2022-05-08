# IP Grabber

Logs the client IPv4 address and redirects them to a target website using Node.js.

The grabber will redirect the client to the first commandline argument (a link or IP) if it exists. Otherwise, it will use the default link defined in the code. 2 Node.js servers will be hosted on port 3030 (HTTP) and port 3031 (HTTPS) by default.
If you plan on using HTTPS, you can generate a certificate using these commands:

```sh
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
mkdir cert && mv cert.pem key.pem cert && rm csr.pem
```
