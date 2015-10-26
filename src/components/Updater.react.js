import React from 'react/addons';
import updateActions from '../actions/updateActions';
import updaterStore from '../stores/updaterStore';

import UpdaterUtil from '../utils/UpdaterUtil'

var Updater = React.createClass({

    getInitialState: function() {
        return {
            appUpdateAvailable: updaterStore.getState().appUpdateAvailable,
            daemonUpdatesAvailable: updaterStore.getState().daemonUpdatesAvailable
        };
    },
    handleCheckUpdates: function() {
        UpdaterUtil.checkMainUpdate();
        UpdaterUtil.checkDaemonUpdates();
    },
    render: function() {
        var appUpdateAvailable = this.state.appUpdateAvailable ? this.state.appUpdateAvailable : {};
        var daemonUpdatesAvailable = this.state.daemonUpdatesAvailable ? this.state.daemonUpdatesAvailable : {};
        return (
            <section>
                <h1 className='title'>Updates</h1>
                <button className="left" type="submit" onClick={this.handleCheckUpdates}><p>Check for updates</p></button>
            </section>

        );
    }
});

module.exports = Updater;
