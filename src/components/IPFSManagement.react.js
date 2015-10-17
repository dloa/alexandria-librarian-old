import React from 'react/addons';
import Router from 'react-router';
import IPFS from '../actions/ipfsActions';
import utils from '../utils/Util';
import terminal from './Terminal-Emulator.react';



var IPFSManagementView = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {};
    },
    handleOpenIPFSWebUI: function(e) {

    },
    render: function() {
        return (
            <div className='content-scroller'>
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


module.exports = IPFSManagementView;
