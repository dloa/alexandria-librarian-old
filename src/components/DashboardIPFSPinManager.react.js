import React from 'react/addons';
import Router from 'react-router';
import IPFS from '../actions/ipfsActions';

var PinManager = React.createClass({
    getInitialState: function() {
        return {
            pinned: [],
            enteredHash: null
        };
    },
    componentDidMount: function() {
        IPFS.getPinned()
            .then(this.update);
    },
    update: function(newhash) {
        if (this.isMounted()) {
            this.setState({
                pinned: newhash
            });
        }
    },
    handleHashInput: function(event) {
        this.setState({
            enteredHash: event.target.value
        });
    },
    handleAddPinLocal: function() {
        IPFS.pinlocal();
    },
    handleAddPinHash: function() {
        var remotehash = this.state.enteredHash
        IPFS.pinRemote(remotehash);
    },
    handlePinRefresh: function() {
        var self = this;
        IPFS.getPinned()
            .then(function(data) {
                self.update(data);
            });
    },
    render: function() {
        var pintext = '';
        this.state.pinned.forEach(function(entry) {
            pintext = pintext + '\n' + JSON.stringify(entry);
        });
        return (
            <section>
                <h1 className="title">Pinned IPFS Files</h1>
                <button className="left PinManager" onClick={this.handleAddPinLocal}><p>Pin local File</p></button> 
                <span className="ipfsspan">or</span>
                <input name="ipfshash" className="ipfshash" placeholder="enter IPFS hash or URL" type="text" />
                <button className="left PinManager" onClick={this.handleAddPinHash}><p>pin file</p></button>
           
                

            </section>
        );
    }
});

module.exports = PinManager;
