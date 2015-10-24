import React from 'react/addons';
import Router from 'react-router';
import ReactTooltip from 'react-tooltip';

import Settings from '../utils/settingsUtil';
import IPFS from '../actions/ipfsActions';
import Florincoind from '../actions/florincoindActions';
import Libraryd from '../actions/librarydActions';
import Logs from './DashboardLogs.react';
import utils from '../utils/util';
import daemonStore from '../stores/daemonStore';




let If = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        } else {
            return false;
        }
    }
});


var Preferences = React.createClass({

    getInitialState: function() {
        return {
            LibrarydInstalled: Settings.get('librarydInstalled'),
            LibrarydEnabled: Settings.get('librarydEnabled'),

            IPFSInstalled: Settings.get('ipfsInstalled'),
            IPFSEnabled: Settings.get('ipfsEnabled'),

            FlorincoindInstalled: Settings.get('florincoindInstalled'),
            FlorincoindEnabled: Settings.get('florincoindEnabled')
        };
    },

    componentDidMount: function() {
        daemonStore.listen(this.update);
    },

    componentWillUnmount: function() {
        daemonStore.unlisten(this.update);
    },

    update: function() {
        if (this.isMounted()) {
            this.setState({
                LibrarydInstalled: daemonStore.getState().librarydInstalled,
                LibrarydEnabled: daemonStore.getState().librarydEnabled,

                IPFSInstalled: daemonStore.getState().ipfsInstalled,
                IPFSEnabled: daemonStore.getState().ipfsEnabled,

                FlorincoindInstalled: daemonStore.getState().florincoindInstalled,
                FlorincoindEnabled: daemonStore.getState().florincoindEnabled
            });
        }
    },

    InstallLibraryd: function() {
        Libraryd.install()

        this.setState({
            LibrarydInstalled: true
        });

    },
    InstallIPFS: function() {

        IPFS.install()
        this.setState({
            IPFSInstalled: true
        });


    },
    InstallFlorincoind: function() {
        Florincoind.install();
        this.setState({
            FlorincoindInstalled: true
        });
    },
    handleChangeFlorincoindEnabled: function(e) {
        var checked = e.target.checked;
        Florincoind.toggle(checked);
        this.setState({
            FlorincoindEnabled: checked
        });
    },
    handleChangeLibrarydEnabled: function(e) {
        var checked = e.target.checked;
        this.setState({
            LibrarydEnabled: checked
        });

        Libraryd.toggle(checked);
    },
    handleChangeIPFSEnabled: function(e) {
        var checked = e.target.checked;
        this.setState({
            IPFSEnabled: checked
        });
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
                        <If test={this.state.LibrarydInstalled}>
                            <div className="toggle-wrapper">
                                <input checked={this.state.LibrarydEnabled} onChange={this.handleChangeLibrarydEnabled} type="checkbox" id="LibrarydToggle" className="toggle" />
                                <label htmlFor="LibrarydToggle"></label>
                            </div>
                        </If>
                        <p>Libraryd</p>
                        <i className="ion-information-circled"/>
                        <If test={!this.state.LibrarydInstalled}>
                            <div onClick={this.InstallLibraryd} className="install">install</div>
                        </If>
                    </div>
                    <div className="DaemonWrapper">
                        <If test={this.state.IPFSInstalled}>
                            <div className="toggle-wrapper">
                                <input checked={this.state.IPFSEnabled} onChange={this.handleChangeIPFSEnabled} type="checkbox" id="IPFStoggle" className="toggle" />
                                <label htmlFor="IPFStoggle"></label>
                            </div>
                        </If>
                        <p>IPFS</p>
                        <i className="ion-information-circled"/>
                        <If test={this.state.IPFSEnabled}>
                            <i data-tip="Open IPFS Web Interface" onClick={this.handleOpenIPFSWebUI} className="ion-cube"/>
                        </If>
                        <If test={!this.state.IPFSInstalled}>
                            <div onClick={this.InstallIPFS} className="install">install</div>
                        </If>
                    </div>
                    <div className="DaemonWrapper">
                        <If test={this.state.FlorincoindInstalled}>
                            <div className="toggle-wrapper">
                                <input checked={this.state.FlorincoindEnabled} onChange={this.handleChangeFlorincoindEnabled} type="checkbox" id="Florincoindtoggle" className="toggle" />
                                <label htmlFor="Florincoindtoggle"></label>
                            </div>
                        </If>
                        <p>Florincoin</p>
                        <i className="ion-information-circled"/>
                        <If test={!this.state.FlorincoindInstalled}>
                            <div onClick={this.InstallFlorincoind} className="install">install</div>
                        </If>
                    </div>
                </section>
                <Logs />
                <ReactTooltip place="right" data-type="dark" multiline={true} data-effect="float" />
            </div>
        );

    }

});


module.exports = Preferences;