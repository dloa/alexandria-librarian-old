import React from 'react/addons';
import Router from 'react-router';
import IPFS from '../actions/ipfsActions';
import ReactDataGrid from 'react-data-grid';

var rowGetter = function(i) {
    return _rows[i];
};

var unpinFormatter = React.createClass({
    render: function() {
        return (<img width='75' src={this.props.value} />);
    }
});


//Columns definition
var columns = [{
    key: 'filename',
    name: 'file name',
    width: 75
}, {
    key: 'hash',
    name: 'hash',
    width: 120
}, {
    key: 'filesize',
    name: 'file size'
}, {
    key: 'seeds',
    name: 'seeds'
}, {
    key: 'up-pin',
    name: 'up-pin',
    formatter: unpinFormatter
}];


var RowRenderer = React.createClass({
    displayName: "RowRenderer",
    getRowStyle: function() {
        return {
            height: '75px'
        }
    },
    render: function() {
        return (<div style={this.getRowStyle()}><ReactDataGrid.Row ref="row" {...this.props}/></div>)
    }
});



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
