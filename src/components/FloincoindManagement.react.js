import React from 'react/addons';
import path from 'path';
import remote from 'remote';
import _ from 'lodash';

import TerminalEmu from './TerminalEmulator.react';
import daemonStore from '../stores/daemonStore';
import Florincoind from '../actions/florincoindActions';
import utils from '../utils/util';


var FlorincoindManagementView = React.createClass({

    getInitialState: function() {
        return {
            stats: daemonStore.getState().florincoindStats,
        };
    },
    componentDidMount: function() {
        daemonStore.listen(this.update);
        this.checkStats();
    },
    componentWillUnmount: function() {
        daemonStore.unlisten(this.update);
    },
    checkStats: function() {
        if (this.isMounted()) {
            Florincoind.getStats();
            _.delay(this.checkStats, 2000); //refresh every 2 seconds
        }
    },
    update: function() {
        if (this.isMounted()) {
            this.setState({
                stats: daemonStore.getState().florincoindStats,
            });
        }
    },
    handleOpenIPFSWebUI: function(e) {

    },
    render: function() {
        var daemonbin = path.join(remote.require('app').getPath('userData'), 'bin', (utils.getOS() === 'win') ? 'florincoind.exe' : 'florincoind');
        var stats = this.state.stats ? JSON.stringify(this.state.stats.blockcount) : {};
        return (
            <div className='content-scroller'>
        		<section className="ipfsStatus">
            		<p>Status:</p><span>Connected to {peers} peers</span>
                    <br/>
                    <span> {stats}</span>
        		</section>
                <TerminalEmu rpc="true" daemonname="florincoind" daemonbin={daemonbin} />
      		</div>
        );
    }
});


module.exports = FlorincoindManagementView;