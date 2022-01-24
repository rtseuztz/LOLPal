declare var require: any
import GameClasses = require('./GameClasses')
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var $ = require('jquery');

class Riot extends React.Component {
    constructor(props) {

        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="gameBox">
                <div className="participantsBox">2banana</div>
            </div>
        );
    }
}

ReactDOM.render(<Riot className="contentBox"/>, document.getElementById('riot'));