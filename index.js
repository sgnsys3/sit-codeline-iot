var express = require('express');
var fs = require('fs');
var http = require('http');
var app = express();
var route = require('./src/routes');
var monitorOnOff = require('./src/gpio/onPin11');

var env = JSON.parse(fs.readFileSync('./.env.json', 'utf8'));

app.use('/', route);
app.use('/static', express.static('./resource/static'));

var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(env.port);


io.on('connection', (client) => {
    monitorOnOff(client);
});

console.log(`Server listen at port ${env.port}`);