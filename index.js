var express = require('express');
var fs = require('fs');
var http = require('http');
var app = express();
var route = require('./src/routes');
var monitorOnOff = require('./src/gpio/onPin11');

var env = JSON.parse(fs.readFileSync('./.env.json', 'utf8'));

app.use('/', route);
app.use('/static', express.static('./resource/static'));
var isFinish = { 
    status: true
};
var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(env.port);
monitorOnOff(io, isFinish);
io.on('connection', (client) => {
    client.on('finish', () => {
        console.log('finish received');
        isFinish.status = true;
    });
});

console.log(`Server listen at port ${env.port}`);