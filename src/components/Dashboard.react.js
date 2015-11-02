import React from 'react/addons';
import Router from 'react-router';

import Settings from '../utils/settingsUtil';
import IPFS from '../actions/ipfsActions';
import Florincoind from '../actions/florincoindActions';
import Libraryd from '../actions/librarydActions';
import Logs from './DashboardLogs.react';
import utils from '../utils/util';
import daemonStore from '../stores/daemonStore';


var If = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        } else {
            return false;
        }
    }
});

var Dashboard = React.createClass({

    getInitialState: function() {
        return {
            checkedRunning: daemonStore.getState().checkedRunning,
            LibrarydEnabled: daemonStore.getState().librarydEnabled,
            IPFSEnabled: daemonStore.getState().ipfsEnabled,
            FlorincoindEnabled: daemonStore.getState().florincoindEnabled
        };
    },

    componentDidMount: function() {
        if (!this.state.checkedRunning) {
            IPFS.checkRunning();
            Florincoind.checkRunning();
            Libraryd.checkRunning();
        }

        daemonStore.listen(this.update);
    },

    componentWillUnmount: function() {
        daemonStore.unlisten(this.update);
    },

    update: function() {
        if (this.isMounted()) {
            this.setState({
                LibrarydEnabled: daemonStore.getState().librarydEnabled,
                IPFSEnabled: daemonStore.getState().ipfsEnabled,
                FlorincoindEnabled: daemonStore.getState().florincoindEnabled
            });
        }
    },

    handleChangeFlorincoindEnabled: function(e) {
        var checked = e.target.checked;
        Florincoind.toggle(checked);
    },
    handleChangeLibrarydEnabled: function(e) {
        var checked = e.target.checked;
        Libraryd.toggle(checked);
    },
    handleChangeIPFSEnabled: function(e) {
        var checked = e.target.checked;
        IPFS.toggle(checked);
    },
    handleOpenIPFSWebUI: function(e) {
        utils.openUrl('http://localhost:5001/webui')
    },
    render: function() {
        return (
            <div className='content-scroller' id='content'>
                <section>
                    <h1 className='title'>Local Daemons</h1>
                    <div className="DaemonWrapper">
                        <div className="toggle-wrapper">
                            <input checked={this.state.IPFSEnabled} onChange={this.handleChangeIPFSEnabled} type="checkbox" id="IPFStoggle" className="toggle" />
                            <label htmlFor="IPFStoggle"></label>
                        </div>
                        <p>IPFS</p>
                        <i className="ion-information-circled"/>
                        <If test={this.state.IPFSEnabled}>
                            <i onClick={this.handleOpenIPFSWebUI} className="ion-cube"/>
                        </If>
                    </div>
                    <div className="DaemonWrapper">
                        <div className="toggle-wrapper">
                            <input checked={this.state.FlorincoindEnabled} onChange={this.handleChangeFlorincoindEnabled} type="checkbox" id="Florincoindtoggle" className="toggle" />
                            <label htmlFor="Florincoindtoggle"></label>
                        </div>
                        <p>Florincoin</p>
                        <i className="ion-information-circled"/>
                    </div>
                    <div className="DaemonWrapper">
                        <div className="toggle-wrapper">
                            <input checked={this.state.LibrarydEnabled} onChange={this.handleChangeLibrarydEnabled} type="checkbox" id="LibrarydToggle" className="toggle" />
                            <label htmlFor="LibrarydToggle"></label>
                        </div>
                        <p>Libraryd</p>
                        <i className="ion-information-circled"/>
                    </div>
                </section>
                <Logs />
            </div>
        );

    }

});


module.exports = Dashboard;