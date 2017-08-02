var express = require('express');
var fs = require('fs');
var app = express();
var route = require('./src/routes');
var env = JSON.parse(fs.readFileSync('./.env.json', 'utf8'));

app.use('/', route);

app.listen(env.port);
console.log(`Server listen at port ${env.port}`)