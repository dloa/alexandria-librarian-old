import React from 'react';
import path from 'path';
import _ from 'lodash';
import PinActions from './actions';
import PinStore from './store';

export
default React.createClass({
    getInitialState() {
        return {
            pinned: PinStore.getState().pinned
        };
    },

    componentWillMount() {
        PinStore.listen(this.update);
    },

    componentWillUnmount() {
        PinStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                pinned: PinStore.getState().pinned
            });
        }
    },

    handelPin() {
        let pinValue = this.refs['pin-hash'].value;

        console.log('pin called', pinValue)
    },

    generatePinRow(file) {
        return (
            <tr key={file.hash}>
                <td>{file.name}</td>
                <td>{file.hash}</td>
                <td>{file.size}</td>
                <td></td>
                <td className="unpin">
                    <a href="" className="svg btn">
                        <object type="image/svg+xml" data="images/svg/location-16px-e_pin-remove.svg"/>
                    </a>
                </td>
            </tr>
        );
    },

    generatePined() {
        var pinned = []
        _.forEach(this.state.pinned, file => {
            pinned.push(this.generatePinRow(file));
        });
        return pinned;
    },

    render() {
        return (
            <div className="section ipfs">
                <form onSubmit={this.handelPin} className="form-inline">
                    <button onClick={PinActions.pinLocal} type="button" className="btn btn-default">Browse local</button>
                    <p>or</p>
                    <div className="form-group pull-right">
                        <input ref="pin-hash" type="text" className="form-control ipfs" id="" placeholder="Enter Local Path, IPFS hash or URL"/>
                        <button type="submit" className="btn btn-primary btn-pin-file">Pin file</button>
                    </div>
                </form>
                
                <table className="table pinned-files">
                    <thead>
                        <tr>
                            <th>File name</th>
                            <th>Hash</th>
                            <th>File size</th>
                            <th>Seeds</th>
                            <th>Unpin</th>
                        </tr>
                    </thead>

                    <colgroup>
                        <col className=""/>
                        <col className=""/>
                        <col className=""/>
                        <col className=""/>
                        <col className="col-sm-1"/>
                    </colgroup>
                    <tbody>
                        {this.generatePined()}
                    </tbody>
                </table>
            </div>
        );
    }
});