var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var $ = require('jquery');

export module GameModule {
    export class Game extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                gameName: "bunghead",
            }
        }
        render() {
            return (
                <div className="gameBox">
                    <div className="participantsBox">{this.props.participantsComponent}</div>
                </div>
            );
        }
    }
    export class GameFacade extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                expand: ""
            }
            this.handleClick = this.handleClick.bind(this);

        }

        handleClick() {
            //let inputName = event.target.value
            if (this.state.expand == " expand") {
                this.setState({
                    expand: ""
                })
            } else {
                this.setState({
                    expand: " expand"
                })
            }

        }
        render() {
            return (
                <div className={"gameFacade " + this.props.win + this.state.expand} onClick={this.handleClick}>
                    <div className="gameDisplay">
                        <img className="championIcon" src={"DataDragon/img/champion/" + this.props.championIcon + ".png"} />
                        <div className="gameStats">{this.props.gameStats}</div>
                        <div className="gameDate">{this.props.gameDate}</div>
                    </div>
                    {this.props.gameBox}
                </div>
            );
        }
    }
    export class ParticipantList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            }
        }

        render() {
            return (
                <div className="participantList">
                    <ul className="team1">{this.props.team1}</ul>
                    <ul className="team2">{this.props.team2}</ul>
                </div>
            );
        }
    }
    export class RightParticipant extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            }
        }

        render() {
            return (
                <div className="participantRight">
                    <div className="summonerName">{this.props.summonerName}</div>
                    <img className="championIcon" src={"DataDragon/img/champion/" + this.props.championIcon + ".png"} />
                </div>
            );
        }
    }
    export class LeftParticipant extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            }
        }

        render() {
            return (
                <div className="participantLeft">
                    <img className="championIcon" src={"DataDragon/img/champion/" + this.props.championIcon + ".png"} />
                    <div className="summonerName">{this.props.summonerName}</div>
                </div>
            );
        }
    }
    export class GameStats extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                kda: "",
                longkda: "",
                score:0
            }
        }

        render() {
            return (
                <div className="gameStats">
                    <div className="kda">{this.props.kda}</div>
                    <div className="longKDA">{this.props.longkda}</div>
                    <div className="score">{this.props.score}</div>
                </div>

            );
        }
    }
}
export default GameModule.Game