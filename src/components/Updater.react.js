import React from 'react/addons';
import updateActions from '../actions/updateActions';
import updaterStore from '../stores/updaterStore';

import UpdaterUtil from '../utils/UpdaterUtil';
import notificationsUtil from '../utils/notifyUtil';

var Updater = React.createClass({

    getInitialState: function() {
        return {
            updatesChecked: updaterStore.getState().updatesChecked,
            appUpdateAvailable: updaterStore.getState().appUpdateAvailable,
            daemonUpdatesAvailable: updaterStore.getState().daemonUpdatesAvailable
        };
    },
    componentDidMount: function() {
        updaterStore.listen(this.update);

        if (!this.state.updatesChecked) {
            UpdaterUtil.notify('app');
            UpdaterUtil.checkMainUpdate();
            UpdaterUtil.checkDaemonUpdates();
        }
    },
    componentWillUnmount: function() {
        updaterStore.unlisten(this.update);
    },
    update: function() {
        if (this.isMounted()) {
            this.setState({
                updatesChecked: updaterStore.getState().updatesChecked,
                appUpdateAvailable: updaterStore.getState().appUpdateAvailable,
                daemonUpdatesAvailable: updaterStore.getState().daemonUpdatesAvailable
            });
        }
    },
    render: function() {
        var appUpdateAvailable = this.state.appUpdateAvailable ? this.state.appUpdateAvailable : {};
        var daemonUpdatesAvailable = this.state.daemonUpdatesAvailable ? this.state.daemonUpdatesAvailable : {};
        return (
            <section>
                <h1 className='title'>Updates</h1>
                <button className="left" type="submit" onClick={this.checkUpdates}><p>Check for updates</p></button>
            </section>

        );
    }
});

module.exports = Updater;