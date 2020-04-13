const http = require("http");

const requesthandler = require("./messagetxt");

const server = http.createServer(requesthandler);

server.listen(3000);

