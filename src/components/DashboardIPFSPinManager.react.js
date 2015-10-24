import React from 'react/addons';
import Router from 'react-router';
import IPFS from '../actions/ipfsActions';
import DataGrid from 'react-datagrid';



var data = [{
    'file name': 'LibrarianSetup.exe',
    hash: 'F9xGeGDrkMXRTu3WUPpXrYgVp295jN5ybP',
    filesize: '24.5 MB',
    seeds: '1521',
    unpin: 'icon'
}];



var columns = [{
    name: 'file name'
}, {
    name: 'hash'
}, {
    name: 'filesize'
}, {
    name: 'seeds'
}, {
    name: 'unpin'
}];




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
                <DataGrid
                    idProperty='id'
                    dataSource={data}
                    columns={columns}
                    style={{height: 400}}
                />

            </section>
        );
    }
});

module.exports = PinManager;
