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
let key = "RGAPI-f2f9b200-f036-49d3-a30c-0d495c7af705";


async function riotCall(queryString) {
    return needle('get', queryString)
        .then(res => {
            return res.body;
        })
        .catch(res => {
            return "";
        })
}
async function getGameInfo(gameID) {
    let queryString = "https://americas.api.riotgames.com/lol/match/v5/matches/" + gameID + "?api_key=" + key;
    return needle('get', queryString)
        .then(res => {
            if (res.statusCode != 200) {
                return new Promise((resolve) => {
                    setTimeout(resolve(getGameInfo(gameID)), 1000)
                })
            }
            else {
                return res.body;
            }
        })
        .catch(res => {
            return "";
        })
}
function getGameIDs(query) {
    let puuid = query.puuid;
    let queryString = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=19&api_key=" + key;
    return needle('get', queryString)
        .then(res => {
            return res.body;
        })
        .catch(err => {
            return "";
        })
}
async function getGamesInfo(idList) {
    let promiseList = [];
    let newGameArr = [];
    for (var i in idList) {
        let gameID = idList[i];
        let newGame =  getGameInfo(gameID)
            .then(game => {
                return game;
            })
        promiseList.push(newGame);
    }
    newGameArr = await Promise.all(promiseList);
    newGameArr = _.filter(newGameArr, (game) => {
        return game != "";
    })
    return newGameArr;
}
module.exports = {
    processGet: async function (req) {
        let query = req.query
        switch (query.action) {
            case "getUser":
                //return "w";
                return this.getUser(query);
            case "getGames":
                return this.getGamesNew(query);
            case "onLoad":
                return this.onLoad();
            default:
                return "";
        }
    },
    getUser: function (query) {
        let name = query.name;
        let queryString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + key;
        return new Promise(function (resolve, reject) {
            needle.get(queryString, function (error, res) {
                if (error || res.statusCode != 200) { 
                    resolve("");
                } else {
                    resolve(res.body);
                }
            })
        })
    },
    getGamesNew: async function (query) {
        let gameArr = await getGameIDs(query)
            .then(idList => getGamesInfo(idList))
            .then((gameList) => {
                return gameList
            })
            .catch(val => {
                console.log(val);
                return "";
            })
        return gameArr;
    },
    onLoad: function () {
        //sqlFile.requireSql([sql]);
        //sqlFile.connectSql();
    },
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
    extractDataDragon: function () {
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
                        /*                    fs.mkdir(path.join(__dirname, 'test'), (err) => {
                                                if (err) resolve(err);
                                                console.log("worked");
                                            })*/
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
}

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
*//*    getUser: function (query) {
        let name = query.name;
        let queryString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" & name & "?api_key=" & key & ";
*//*        let response = req(queryString, (error, res) => {
            if (error || response.statusCode != 200)
                return "";
            console.log(res);
        })*//*

    }*//*
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
