import React from 'react';
import path from 'path';

import PinActions from './actions';
import PinStore from './store';

export
default React.createClass({
    getInitialState() {
        return {

        };
    },

    componentWillMount() {

    },
    componentWillUnmount() {

    },

    update() {
        if (this.isMounted()) {
            this.setState({

            });
        }
    },
    handleHashInput(event) {
        this.setState({

        });
    },
    handelPin() {
        let pinValue = this.refs['pin-hash'].value;

        console.log('pin called', pinValue)
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
                        <tr>
                            <td>DJ Day.flac</td>
                            <td>d9729feb74992cc3482b350163a1a010</td>
                            <td>186 MB</td>
                            <td>17</td>
                            <td className="unpin">
                                <a href="" className="svg btn">
                                    <object type="image/svg+xml" data="assets/svg/location-16px-e_pin-remove.svg"/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>DJ Day.flac</td>
                            <td>d9729feb74992cc3482b350163a1a010</td>
                            <td>186 MB</td>
                            <td>17</td>
                            <td className="unpin">
                                <a href="" className="svg btn">
                                    <object type="image/svg+xml" data="assets/svg/location-16px-e_pin-remove.svg"/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>DJ Day.flac</td>
                            <td>d9729feb74992cc3482b350163a1a010</td>
                            <td>186 MB</td>
                            <td>17</td>
                            <td className="unpin">
                                <a href="" className="svg btn">
                                    <object type="image/svg+xml" data="assets/svg/location-16px-e_pin-remove.svg"/>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});