#!/usr/bin/node

var fs = require('fs');
var http = require('http');
var https = require('https');
var Cel = require('./cel.js/Cel.js').createRaw; //create is the default Cel

var private_key = fs.readFileSync('private/server.key', 'utf8');
var certificate = fs.readFileSync('private/server.crt', 'utf8');
var credentials = {
  key: private_key,
  cert: certificate
};

var express = require('express');
var app = express();
var myApp = {};
myApp.cel = require('./app/app.cel.js');

var routes = [
  ['/', getIndex],
  ['/index', getIndex],
  ['/test', getTest]
];

for (var i = 0; i < routes.length; i++) {
  var method, route, func;
  if (routes[i].length == 2) {
    method = "get";
    route = routes[i][0];
    func = routes[i][1];
  } else {
    method = routes[i][0];
    route = routes[i][1];
    func = routes[i][2];
  }
  app[method](route, func);
}

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, startApp);
httpsServer.listen(8443, startApp);

function getIndex(req, res) {
  var dom = Cel(myApp.cel.index);
  res.send(dom);
}

function getTest(req, res) {
  var dom = Cel(myApp.cel.test);
  res.send(dom);
}

function startApp() {
  console.log('App listening on port');
}
