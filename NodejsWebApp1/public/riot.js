"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var $ = require('jquery');
class Riot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: "gameBox" },
            React.createElement("div", { className: "participantsBox" }, "2banana")));
    }
}
ReactDOM.render(React.createElement(Riot, { className: "contentBox" }), document.getElementById('riot'));
//# sourceMappingURL=riot.js.map