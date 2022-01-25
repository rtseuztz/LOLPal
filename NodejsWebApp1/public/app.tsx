declare var require: any
import GameClasses = require('./GameClasses')
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var $ = require('jquery');


class CommentBox extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            name: "name!",
            inputName: "",
            level: "LEvel",
            games: [],
            champions: {},
            user: {},
        };
        this.searchUser = this.searchUser.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getUser = this.getUser.bind(this);
        this.loadGames = this.loadGames.bind(this);
        this.getGameRows = this.getGameRows.bind(this);
        this.getLeftTab = this.getLeftTab.bind(this);
        this.getParticipants = this.getParticipants.bind(this);
        this.findChampion = this.findChampion.bind(this);
        this.getGameBox = this.getGameBox.bind(this);
    }
    componentDidMount() {
        let t = this;
        $.get({
            url: '/api',
            data: {
                action: "onLoad"
            }, success: function (championsObj) {
                /*t.setState({
                    champions: championsObj,
                })*/
            }
        })
    }
    getUser(inputName, callback) {
        $.get({
            url: '/api',
            data: {
                action: "getUser",
                name: inputName
            },
            success: function (result) {
                if (result == "Error") {
                    callback(result);
                    return false;
                }
                //let user = JSON.parse(result);
                let user = result;
                console.log(user);
                callback(user);
            }
        })
    }
    loadGames(puuid, callback) {
        $.ajax({
            type: "GET",
            url: "/api",
            data: {
                action: "getGames",
                puuid: puuid
            },
            success: function (result) {
                if (result == "Error") {
                    callback(result);
                    return false;
                }
                //let gameList = JSON.parse(result);
                let gameList = result;
                console.log(gameList);
                callback(gameList);
            }
        })
    }
    handleClick(e, data) {
        this.searchUser();
    }
    handleKeyDown(event) {
        if (event.key == 'Enter') {
            this.searchUser();
        }
    }
    searchUser() {
        //let inputName = event.target.value
        let inputName = this.state.inputName;
        var t = this;
        this.getUser(inputName, function (user) {
            if (user == "Error") return false;
            let currentGames = [];
            t.loadGames(user.puuid, function (gameList) {
                if (gameList == "Error") return false;
                currentGames = gameList;
                console.log("ISWORKING!! !");
                t.setState({
                    user: user,
                    name: user.name,
                    level: user.summonerLevel,
                    games: currentGames,
                })
            });

        });
    }
    handleChange(event) {
        this.setState({
            inputName: event.target.value
        });
    }

    getLeftTab() {

    }
    getGameRows() {
        let games = this.state.games;

        let gameList = []

        let gameArr = games ? _.sortBy(games, (game) => {
            return -game.info.gameCreation
        }) : [];

        for (var i in gameArr) {
            let game = gameArr[i];
            if (game != "") {

                let participants = game.info.participants
                let user = _.find(participants, (x) => {
                    return x.summonerName == this.state.name;

                });
                let champion = user.championName;
                let gameDate = new Date(game.info.gameCreation).toLocaleDateString();
                let gameStats = <GameStats
                    kda={((user.kills + user.assists) / user.deaths).toFixed(2)}
                    longkda={user.kills + "/" + user.deaths + "/" + user.assists}
                    score={4}
                />//user.kills + "/" + user.deaths + "/" + user.assists;
                let participantsComponent = this.getParticipants(participants);
                let gameBox = this.getGameBox(participantsComponent);
                let win = user.win ? "win" : "lose";

                gameList[i] = <GameFacade
                    key={i}
                    win={win}
                    gameBox={gameBox}
                    championIcon={champion}
                    gameStats={gameStats}
                    gameDate={gameDate}


                />;
            }
        }
        return <ol className="gameList">{gameList}</ol>;
    }
    getGameBox(participantsComponent) {

        return <Game
            participantsComponent={participantsComponent}
        />
    }
    getParticipants(participants) {
        let team1 = [];
        let team2 = [];
        for (var p in participants) {
            let player = participants[p];
            player.teamId == '100'
                ? team1.push(player)
                : team2.push(player);
        }
        team1 = _.map(team1, (p) => {
            return <LeftParticipant
                key={p.summonerName}
                summonerName={p.summonerName}
                championIcon={p.championName}
            />
        });
        team2 = _.map(team2, (p) => {
            return <RightParticipant
                key={p.summonerName}
                summonerName={p.summonerName}
                championIcon={p.championName}
            />
        });
        return (
            <div>
                <ParticipantList
                    team1={team1}
                    team2={team2}
                />
            </div>
        )

    }
    findChampion() {
        console.log("X");
    }
    render() {

        return (
            <div className="contentBox">
                <header id="header">LOLPal
                    <div htmlFor="summoner_name_input" id="summoner_name_input_label">Enter your summoner name</div>
                    <input id="summoner_name_input" name="summonerNameInput" onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
                    <button onClick={this.handleClick}>Search</button>

                </header>
                {this.getGameRows()}
            </div>
        );
    }
}
let Game = GameClasses.GameModule.Game
let GameFacade = GameClasses.GameModule.GameFacade
let GameStats = GameClasses.GameModule.GameStats
let ParticipantList = GameClasses.GameModule.ParticipantList
let LeftParticipant = GameClasses.GameModule.LeftParticipant
let RightParticipant = GameClasses.GameModule.RightParticipant


ReactDOM.render(<CommentBox className="contentBox" />, document.getElementById('root'));