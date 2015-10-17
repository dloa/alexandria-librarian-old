import React from 'react/addons';
import Router from 'react-router';


var termainalEmu = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {
            commands: {},
            history: [],
            prompt: '$ '
        }
    },
    clearHistory: function() {
        this.setState({
            history: []
        });
    },
    registerCommands: function() {
        this.setState({
            commands: {
                'help': this.showHelp
            }
        });
    },
    showWelcomeMsg: function() {
        this.addHistory("ΛLΞXΛNDRIΛ Librarian Terminal Emulator");
        this.addHistory("Type `help` to see what all commands are available");
    },
    openLink: function(link) {

    },
    showHelp: function() {
        this.addHistory("command - commandinfo");
    },
    componentDidMount: function() {
        var term = this.refs.term.getDOMNode();
        this.registerCommands();
        this.showWelcomeMsg();
    },
    componentDidUpdate: function() {
        var el = React.findDOMNode(this);
        var container = document.getElementById("main");
        container.scrollTop = el.scrollHeight;
    },
    handleInput: function(e) {
        if (e.key === "Enter") {
            var input_text = this.refs.term.getDOMNode().value;
            var input_array = input_text.split(' ');
            var input = input_array[0];
            var arg = input_array[1];
            var command = this.state.commands[input];

            this.addHistory(this.state.prompt + " " + input_text);

            if (command === undefined) {
                this.addHistory("sh: command not found: " + input);
            } else {
                command(arg);
            }
            this.clearInput();
        }
    },
    clearInput: function() {
        this.refs.term.getDOMNode().value = "";
    },
    addHistory: function(output) {
        var history = this.state.history;
        history.push(output)
        this.setState({
            'history': history
        });
    },
    handleClick: function() {
        var term = this.refs.term.getDOMNode();
        term.focus();
    },
    render: function() {
        var output = this.state.history.map(function(op, i) {
            return <p key={i}>{op}</p>
        });
        console.log(output)
        return (
            <div className='input-area' onClick={this.handleClick}>
                {output}
                <p>
                    <span className="prompt">{this.state.prompt}</span> 
                    <input type="text" onKeyPress={this.handleInput} ref="term" />
                </p>
            </div>
        )
    }
});

module.exports = termainalEmu;
