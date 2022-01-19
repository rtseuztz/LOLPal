"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var $ = require('jquery');
var GameModule;
(function (GameModule) {
    class Game extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                gameName: "bunghead",
            };
        }
        render() {
            return (React.createElement("div", { className: "gameBox" },
                React.createElement("div", { className: "participantsBox" }, this.props.participantsComponent)));
        }
    }
    GameModule.Game = Game;
    class GameFacade extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                expand: ""
            };
            this.handleClick = this.handleClick.bind(this);
        }
        handleClick() {
            //let inputName = event.target.value
            if (this.state.expand == " expand") {
                this.setState({
                    expand: ""
                });
            }
            else {
                this.setState({
                    expand: " expand"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: "gameFacade " + this.props.win + this.state.expand, onClick: this.handleClick },
                React.createElement("div", { className: "gameDisplay" },
                    React.createElement("img", { className: "championIcon", src: "DataDragon/img/champion/" + this.props.championIcon + ".png" }),
                    React.createElement("div", { className: "gameStats" }, this.props.gameStats),
                    React.createElement("div", { className: "gameDate" }, this.props.gameDate)),
                this.props.gameBox));
        }
    }
    GameModule.GameFacade = GameFacade;
    class ParticipantList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", { className: "participantList" },
                React.createElement("ul", { className: "team1" }, this.props.team1),
                React.createElement("ul", { className: "team2" }, this.props.team2)));
        }
    }
    GameModule.ParticipantList = ParticipantList;
    class RightParticipant extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", { className: "participantRight" },
                React.createElement("div", { className: "summonerName" }, this.props.summonerName),
                React.createElement("img", { className: "championIcon", src: "DataDragon/img/champion/" + this.props.championIcon + ".png" })));
        }
    }
    GameModule.RightParticipant = RightParticipant;
    class LeftParticipant extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", { className: "participantLeft" },
                React.createElement("img", { className: "championIcon", src: "DataDragon/img/champion/" + this.props.championIcon + ".png" }),
                React.createElement("div", { className: "summonerName" }, this.props.summonerName)));
        }
    }
    GameModule.LeftParticipant = LeftParticipant;
    class GameStats extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                kda: "",
                longkda: "",
                score: 0
            };
        }
        render() {
            return (React.createElement("div", { className: "gameStats" },
                React.createElement("div", { className: "kda" }, this.props.kda),
                React.createElement("div", { className: "longKDA" }, this.props.longkda),
                React.createElement("div", { className: "score" }, this.props.score)));
        }
    }
    GameModule.GameStats = GameStats;
})(GameModule = exports.GameModule || (exports.GameModule = {}));
exports.default = GameModule.Game;
//# sourceMappingURL=GameClasses.js.map