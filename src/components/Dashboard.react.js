import React from 'react/addons';
import Router from 'react-router';
import Settings from '../utils/SettingsUtil';

let If = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        }
        else {
            return false;
        }
    }
});


var Preferences = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function () {
    return {
      LibrarydInstalled: Settings.get('LibrarydInstalled'),
      LibrarydEnabled: Settings.get('LibrarydEnabled'),
      IPFSInstalled: Settings.get('IPFSInstalled'),
      IPFSEnabled: Settings.get('IPFSEnabled')
    };
  },

  handleChangeLibrarydEnabled: function (e) {
    var checked = e.target.checked;
    this.setState({
      LibrarydEnabled: checked
    });
  },
  handleChangeIPFSEnabled: function (e) {
    var checked = e.target.checked;
    this.setState({
      LibrarydEnabled: checked
    });

  },

   render: function () {

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
    			<div className="install">install</div>
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
    			<div className="install">install</div>
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
