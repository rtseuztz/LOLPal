var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//var sqlFile = require('./sql');
//var sql = require('mssql');
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
var key = "RGAPI-51c97fc7-77c5-419f-9398-3edae348adf7";
function riotCall(queryString) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, needle('get', queryString)
                    .then(function (res) {
                    return res.body;
                })["catch"](function (res) {
                    return "";
                })];
        });
    });
}
function getGameInfo(gameID) {
    return __awaiter(this, void 0, void 0, function () {
        var queryString;
        var _this = this;
        return __generator(this, function (_a) {
            queryString = "https://americas.api.riotgames.com/lol/match/v5/matches/" + gameID + "?api_key=" + key;
            return [2 /*return*/, needle('get', queryString)
                    .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(res.statusCode != 200)) return [3 /*break*/, 2];
                                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000); })];
                            case 1:
                                _a.sent();
                                getGameInfo(gameID);
                                return [3 /*break*/, 3];
                            case 2: return [2 /*return*/, res.body];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })["catch"](function (res) {
                    return "";
                })];
        });
    });
}
function getGameIDs(query) {
    var puuid = query.puuid;
    var queryString = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=19&api_key=" + key;
    return needle('get', queryString)
        .then(function (res) {
        return res.body;
    })["catch"](function (err) {
        return "";
    });
}
function getGamesInfo(idList) {
    return __awaiter(this, void 0, void 0, function () {
        var promiseList, newGameArr, i, gameID, newGame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promiseList = [];
                    newGameArr = [];
                    for (i in idList) {
                        gameID = idList[i];
                        newGame = getGameInfo(gameID)
                            .then(function (game) {
                            return game;
                        });
                        promiseList.push(newGame);
                    }
                    return [4 /*yield*/, Promise.all(promiseList)];
                case 1:
                    newGameArr = _a.sent();
                    newGameArr = _.filter(newGameArr, function (game) {
                        return game != "";
                    });
                    return [2 /*return*/, newGameArr];
            }
        });
    });
}
module.exports = {
    processGet: function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = req.query;
                switch (query.action) {
                    case "getUser":
                        return [2 /*return*/, this.getUser(query)];
                    case "getGames":
                        return [2 /*return*/, this.getGamesNew(query)];
                    case "onLoad":
                        return [2 /*return*/, this.onLoad()];
                    default:
                        return [2 /*return*/, ""];
                }
                return [2 /*return*/];
            });
        });
    },
    getUser: function (query) {
        var name = query.name;
        var queryString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + key;
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
        return __awaiter(this, void 0, void 0, function () {
            var gameArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getGameIDs(query)
                            .then(function (idList) { return getGamesInfo(idList); })
                            .then(function (gameList) {
                            return gameList;
                        })["catch"](function (val) {
                            console.log(val);
                            return "";
                        })];
                    case 1:
                        gameArr = _a.sent();
                        return [2 /*return*/, gameArr];
                }
            });
        });
    },
    onLoad: function () {
        //sqlFile.requireSql([sql]);
        //sqlFile.connectSql();
    }
};
/*    onLoad: function () {
let dataDragon = new Promise((resolve, error) => {
    var getStream = function () {
        var jsonData = 'DataDragon/data/en_US/champion.json',
            stream = fs.createReadStream(jsonData, { encoding: 'utf8' }),
            parser = JSONStream.parse('*');
        return stream.pipe(parser);
    };

    getStream()
        .pipe(es.mapSync(function (data) {
            if (typeof (data) == "object") {
                resolve(data);
            }
        }));
});
let sqlConnect = sql.connectSql();
return new Promise((resolve, error) => {
    let retArray = await Promise.all([dataDragon, sqlConnect]);
    resolve(retArray[0]);
})


},*/
/*   extractDataDragon: function () {
       let extract = tar.extract();
       let chunks = [];
       return new Promise(function (resolve, reject) {
           if (true) {
               let myCache = new NodeCache();


           } else {
               extract.on('entry', function (header, stream, next) {
                   stream.on('data', function (chunk) {
                       chunks.push(chunk);
                   });

                   stream.on('end', function () {
                       next();
                   });

                   stream.resume();
               });

               extract.on('finish', function () {
                   if (chunks.length) {
                       */ /*                    fs.mkdir(path.join(__dirname, 'test'), (err) => {
if (err) resolve(err);
console.log("worked");
})*/ /*
var data = Buffer.concat(chunks);
fs.writeFile('DataDragon', data, (err) => {
if (err) resolve(err);
console.log("file has been saved");
resolve(data);
});
console.log(data);

}
});

fs.createReadStream('dragontail-11.16.1.tgz')
.pipe(zlib.createGunzip())
.pipe(extract);
}

})

}
}*/
/*
 *        return new Promise(function (resolve, reject) {
            needle.get(queryString, function (error, res) {
                if (error || res.statusCode != 200) {
                    setTimeout(function () {
                        needle.get(queryString, function (newError, newRes) {
                            resolve(newRes.body)
                        })
                    }, 1000);

                }
                resolve(res.body);
            })
        });*/
/*api = {
*/ /*    getUser: function (query) {
        let name = query.name;
        let queryString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" & name & "?api_key=" & key & ";
*/ /*        let response = req(queryString, (error, res) => {
            if (error || response.statusCode != 200)
                return "";
            console.log(res);
        })*/ /*

}*/ /*
getUser: function (query) {
    let name = query.name;
    let queryString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" & name & "?api_key=" & key;

    console.log("x");
    server.req1(queryString, (error, res) => {
        if (error || res.statusCode != 200)
            return "";
        console.log(res);
    })
}
}*/
//# sourceMappingURL=tools.js.map