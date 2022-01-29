'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var path = require('path');
var express = require('express');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = require('http');
var tools = require('./public/tools');
var app = express();
var needle = require('needle');
var staticPath = path.join(__dirname, '/');
//const SERVER_URL = process.env.SERVER_URL;
// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);
//console.log(staticPath);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(staticPath));
var server = app.listen(app.get('port'), function () {
    console.log('listening');
});
app.use('/api', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let x = yield tools.processGet(req);
        res.send(x);
    });
});
app.get('http://lolpal.azurewebsites.net/information?*', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let x = yield tools.processGet(req);
        res.send(x);
    });
});
app.get('http://lolpal.azurewebsites.net/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let x = yield tools.processGet(req);
        res.send(x);
    });
});
app.get('*', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //let y = await tools.getDataDragon();
        let x = yield tools.processGet(req);
        console.log(__dirname);
        res.send(x);
        //let user = await apiCall(x.queryString, x.callback)
        //res.send(user);
    });
});
app.use(function (req, res, next) {
    res.status(404).send('Unable to find');
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
var apiCall = function (queryString, callback) {
    return new Promise(function (resolve, reject) {
        needle.get(queryString, function (error, response) {
            resolve(callback(error, response));
        });
    });
};
//# sourceMappingURL=server.js.map