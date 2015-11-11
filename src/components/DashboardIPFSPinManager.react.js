import React from 'react';
import IPFS from '../actions/ipfsActions';
import DataGrid from 'react-datagrid';


let data = [{
    'file name': 'LibrarianSetup.exe',
    hash: 'F9xGeGDrkMXRTu3WUPpXrYgVp295jN5ybP',
    filesize: '24.5 MB',
    seeds: '1521',
    unpin: 'icon'
}];

let columns = [{
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


export
default React.createClass({
    getInitialState() {
        return {
            pinned: [],
            enteredHash: null
        };
    },
    componentDidMount() {
        IPFS.getPinned()
    },
    update(newhash) {
        if (this.isMounted()) {
            this.setState({
                pinned: newhash
            });
        }
    },
    handleHashInput(event) {
        this.setState({
            enteredHash: event.target.value
        });
    },
    handleAddPinLocal() {
        IPFS.pinlocal();
    },
    handleAddPinHash() {
        IPFS.pinRemote(this.state.enteredHash);
    },
    handlePinRefresh() {
        IPFS.getPinned();
    },
    render() {
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