import React from 'react/addons';
import Router from 'react-router';
import Settings from '../utils/SettingsUtil';
import IPFS from '../actions/ipfsActions';
import Florincoind from '../actions/FlorincoindActions';

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
            LibrarydInstalled: Settings.get('LibrarydInstalled'),
            LibrarydEnabled: Settings.get('LibrarydEnabled'),
            IPFSInstalled: Settings.get('IPFSInstalled'),
            IPFSEnabled: Settings.get('IPFSEnabled'),
            FlorincoindInstalled: Settings.get('FlorincoindInstalled'),
            FlorincoindEnabled: Settings.get('FlorincoindEnabled')
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
        Settings.save('FlorincoindEnabled', checked);
    },
    handleChangeLibrarydEnabled: function(e) {
        var checked = e.target.checked;
        this.setState({
            LibrarydEnabled: checked
        });
        Settings.save('LibrarydEnabled', checked);
    },
    handleChangeIPFSEnabled: function(e) {
        var checked = e.target.checked;
        this.setState({
            IPFSEnabled: checked
        });
        Settings.save('IPFSEnabled', checked);
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
        <section>
            <h1 className='title'>Mining</h1>
      <div className="DaemonWrapper">
              <div className="toggle-wrapper">
              <input type="checkbox" id="mineFileconeToggle" className="toggle" />
              <label htmlFor="mineFileconeToggle"></label>
          </div>
          <p>Mine Filecoin</p>
          <i className="ion-android-settings"/>
        </div>
        <div className="DaemonWrapper">
              <div className="toggle-wrapper">
              <input type="checkbox" id="mineFlorincoinToggle" className="toggle" />
              <label htmlFor="mineFlorincoinToggle"></label>
          </div>
          <p>Mine Florincoin</p>
          <i className="ion-android-settings"/>
        </div>
        </section>
        <section>
            <h1 className='title'>Other Libary Services</h1>
        </section>
      </div>
        );

    }

});


module.exports = Preferences;