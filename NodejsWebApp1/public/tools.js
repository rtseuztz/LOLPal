"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//var sqlFile = require('./sql');
//var sql = require('mssql');
require('dotenv').config();
var needle = require('needle');
var _ = require('lodash');
//var tar = require('tar-stream');
//var fs = require('fs');
//var zlib = require('zlib');
var path = require('path');
//var NodeCache = require('node-cache');
//var JSONStream = require('JSONStream');
//var es = require('event-stream');
//var loadJsonFile = require('load-json-file');
//var { loadJsonFile } = require('load-json-file');
var key = process.env.api_key;
module.exports = {
    processGet: function (req) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = req.query;
            switch (query.action) {
                case "getUser":
                    return this.getUser(query);
                case "getGames":
                    return this.getGamesNew(query);
                case "onLoad":
                    return this.onLoad();
                default:
                    return "";
            }
        });
    },
    getUser: function (query) {
        let name = query.name;
        let queryString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + key;
        return new Promise(function (resolve, reject) {
            needle.get(queryString, function (error, res) {
                if (error || res.statusCode != 200) {
                    resolve("");
                }
                else {
                    resolve(res.body);
                }
            });
        });
    },
    getGamesNew: function (query) {
        return __awaiter(this, void 0, void 0, function* () {
            let gameArr = yield getGameIDs(query)
                .then(idList => getGamesInfo(idList))
                .then((gameList) => {
                return gameList;
            })
                .catch(val => {
                console.log(val);
                return "";
            });
            return gameArr;
        });
    },
    onLoad: function () {
        //sqlFile.requireSql([sql]);
        //sqlFile.connectSql();
    },
};
function Get(queryString) {
    return __awaiter(this, void 0, void 0, function* () {
        return needle('get', queryString)
            .then(res => {
            return res.body;
        })
            .catch(res => {
            return "";
        });
    });
}
function getGameInfo(gameID) {
    return __awaiter(this, void 0, void 0, function* () {
        let queryString = "https://americas.api.riotgames.com/lol/match/v5/matches/" + gameID + "?api_key=" + key;
        return needle('get', queryString)
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            if (res.statusCode != 200) {
                /*await delay(5000); //THIS DOES NOT WORK!
                return getGameInfo(gameID)*/
                return "";
            }
            else {
                return res.body;
            }
        }))
            .catch(res => {
            return "";
        });
    });
}
/*
 * Retrieve a list of gameIDs
 */
function getGameIDs(query) {
    let puuid = query.puuid;
    let queryString = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=19&api_key=" + key;
    return Get(queryString);
}
function getGamesInfo(idList) {
    return __awaiter(this, void 0, void 0, function* () {
        let promiseList = [];
        let newGameArr = [];
        for (var i in idList) {
            let gameID = idList[i];
            let newGame = getGameInfo(gameID)
                .then(game => {
                return game;
            });
            promiseList.push(newGame);
        }
        newGameArr = yield Promise.all(promiseList);
        newGameArr = _.filter(newGameArr, (game) => {
            return game != "";
        });
        return newGameArr;
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//# sourceMappingURL=tools.js.map