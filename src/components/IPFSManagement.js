import React from 'react/addons';
import Router from 'react-router';
import IPFS from '../actions/ipfsActions';
import Logs from './DashboardLogs.react';
import utils from '../utils/Util';
import terminal from './Terminal-Emulator.react';

let If = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        } else {
            return false;
        }
    }
});


var IPFSManagement = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {
        };
    },
    handleOpenIPFSWebUI: function(e) {

    },
    render: function() {
        return (
      <div className='content-scroller' id='content'>
        <section className="ipfsStatus">
            <p>Status:</p><span>Connected to 7 peers</span>
        </section>
        <section className="cli-emulator">
            <terminal />
        </section>
        <section className="ipfsPinManager">
            
        </section>
      </div>
        );

    }

});


module.exports = IPFSManagement;