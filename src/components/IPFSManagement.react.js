import React from 'react/addons';
import path from 'path';
import remote from 'remote';

import TerminalEmu from './TerminalEmulator.react';
import IPFSPinManager from './DashboardIPFSPinManager.react';
import daemonStore from '../stores/daemonStore';
import IPFS from '../actions/ipfsActions';
import utils from '../utils/util';


var IPFSManagementView = React.createClass({

    getInitialState: function() {
        return {
            stats: daemonStore.getState().ipfsStats,
        };
    },
    componentDidMount: function() {
        IPFS.getStats();
        daemonStore.listen(this.update);
    },
    componentWillUnmount: function() {
        daemonStore.unlisten(this.update);
    },
    update: function() {
        if (this.isMounted()) {
            this.setState({
                stats: daemonStore.getState().ipfsStats,
            });
        }
    },
    handleOpenIPFSWebUI: function(e) {

    },
    render: function() {
        var daemonbin = path.join(remote.require('app').getPath('userData'), 'bin', (utils.getOS() === 'win') ? 'ipfs.exe' : 'ipfs');
        var peers = this.state.stats ? this.state.stats.peers.length : 0;
        return (
            <div className='content-scroller'>
        		<section className="ipfsStatus">
            		<p>Status:</p><span>Connected to {peers} peers</span>
        		</section>
                <TerminalEmu daemonname="ipfs" daemonbin={daemonbin} />
        		<IPFSPinManager />
      		</div>
        );
    }
});


module.exports = IPFSManagementView;