import React from 'react/addons';
import Router from 'react-router';
import LogStore from '../stores/LogStore';
import IPFS from '../actions/ipfsActions';
import TableView from 'react-table-view'



// must ensure all of your fields have values 
let PINNEDDATA = [{
    hash: ''
}];

var PinManager = React.createClass({

    getInitialState: function() {
        return {
            pinned: PINNEDDATA,
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

        console.log(this.state.enteredHash)
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

        return (
        <section>
            <h1 className="title">IPFS pin manager</h1>
            <TableView data={this.state.pinned}  />
            <br></br>
            <input name="username"  onChange={this.handleHashInput} placeholder="Remote Hash" type="text" />
            <br></br>
            <button className="left" type="submit" onClick={this.handleAddPinLocal}><p>Pin local File</p></button>
             <button className="left" type="submit" onClick={this.handleAddPinHash}><p>Pin hash</p></button>
            <button className="left" type="submit" onClick={this.handlePinRefresh}><p>Refresh all pins</p></button>
        </section>
        );
    }
});

module.exports = PinManager;