import React from 'react/addons';
import Router from 'react-router';
import Settings from '../utils/SettingsUtil';
import IPFS from '../actions/ipfsActions';
import Florincoind from '../actions/FlorincoindActions';
import Logs from './DashboardLogs.react';
import IPFSPinManager from './DashboardIPFSPinManager.react';


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
    mixins: [Router.Navigation],

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
    InstallLibraryd: function() {
        this.setState({
            LibrarydInstalled: true
        });
    },
    InstallIPFS: function() {
        IPFS.install();
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
        this.setState({
            FlorincoindEnabled: checked
        });
		    Florincoind.toggle(checked);
        Settings.save('florincoindEnabled', checked);
    },
    handleChangeLibrarydEnabled: function(e) {
        var checked = e.target.checked;
        this.setState({
            LibrarydEnabled: checked
        });
        Settings.save('librarydEnabled', checked);
    },
    handleChangeIPFSEnabled: function(e) {
        var checked = e.target.checked;
        this.setState({
            IPFSEnabled: checked
        });
        IPFS.toggle(checked);
        Settings.save('ipfsEnabled', checked);
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
          <p>Florincoind</p>
          <i className="ion-information-circled"/>
        <If test={!this.state.FlorincoindInstalled}>
          <div onClick={this.InstallFlorincoind} className="install">install</div>
        </If>
        </div>
        </section>
        <If test={this.state.IPFSInstalled}>
          <IPFSPinManager />
        </If>
        <Logs />
      </div>
        );

    }

});


module.exports = Preferences;