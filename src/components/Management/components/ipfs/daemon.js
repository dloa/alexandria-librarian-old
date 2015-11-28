import React from 'react';
import path from 'path';
import remote from 'remote';
import _ from 'lodash';

import TerminalEmu from './TerminalEmulator.react';
import IPFSPinManager from './DashboardIPFSPinManager.react';
import daemonStore from '../stores/daemonStore';
import IPFS from '../actions/ipfsActions';
import utils from '../utils/util';

export
default React.createClass({

    getInitialState() {
        return {
            stats: daemonStore.getState().ipfsStats,
        };
    },
    componentDidMount() {
        daemonStore.listen(this.update);
        this.checkStats();
    },
    componentWillUnmount() {
        daemonStore.unlisten(this.update);
    },
    checkStats() {
        if (this.isMounted()) {
            IPFS.getStats();
            _.delay(this.checkStats, 2000); //refresh every 2 seconds
        }
    },
    update() {
        if (this.isMounted()) {
            this.setState({
                stats: daemonStore.getState().ipfsStats,
            });
        }
    },
    handleOpenIPFSWebUI(e) {

    },
    render() {
        var daemonbin = path.join(remote.require('app').getPath('userData'), 'bin', (utils.getOS() === 'win') ? 'ipfs.exe' : 'ipfs');
        var peers = this.state.stats ? this.state.stats.peers.length : 0;
        var stats = this.state.stats ? JSON.stringify(this.state.stats.stats) : JSON.stringify({});
        return (
            <div className='content-scroller'>
        		<section className="ipfsStatus">
            		<p>Status:</p><span>Connected to {peers} peers</span>
                    <br/>
                    <span> {stats}</span>
        		</section>
                <TerminalEmu daemonname="ipfs" daemonbin={daemonbin} />
        		<IPFSPinManager />
      		</div>
        );
    }
});