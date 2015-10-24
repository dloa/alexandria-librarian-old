import React from 'react/addons';
import utils from '../utils/util';
import path from 'path';
import remote from 'remote';
import TerminalEmu from './TerminalEmulator.react';
import IPFSPinManager from './DashboardIPFSPinManager.react';


var IPFSManagementView = React.createClass({

    getInitialState: function() {
        return {};
    },
    handleOpenIPFSWebUI: function(e) {

    },
    render: function() {
        var daemonbin = path.join(remote.require('app').getPath('userData'), 'bin', (utils.getOS() === 'win') ? 'ipfs.exe' : 'ipfs');

        return (
            <div className='content-scroller'>
        		<section className="ipfsStatus">
            		<p>Status:</p><span>Connected to 7 peers</span>
        		</section>
                <TerminalEmu daemonname="ipfs" daemonbin={daemonbin} />
        		<IPFSPinManager />
      		</div>
        );
    }
});


module.exports = IPFSManagementView;
