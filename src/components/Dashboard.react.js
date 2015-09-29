import React from 'react/addons';

import Router from 'react-router';

var Preferences = React.createClass({
  mixins: [Router.Navigation],

   render: function () {

    return (
	<div className='content-scroller' id='content'>
        <section>
            <h1 className='title'>Local Daemons</h1>
            <div className="DaemonWrapper">
            	<div className="toggle-wrapper">
        			<input type="checkbox" id="LibrarydToggle" className="toggle" />
        			<label htmlFor="LibrarydToggle"></label>
    			</div>
    			<p>Libraryd</p>
    			<i className="ion-information-circled"/>
    			<div className="install">install</div>
    		</div>
    		<div className="DaemonWrapper">
            	<div className="toggle-wrapper">
        			<input type="checkbox" id="IPFStoggle" className="toggle" />
        			<label htmlFor="IPFStoggle"></label>
    			</div>
    			<p>IPFS</p>
    			<i className="ion-information-circled"/>
    			<div className="install">install</div>
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
