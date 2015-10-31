import React from 'react/addons';
import updateActions from '../actions/updateActions';
import updaterStore from '../stores/updaterStore';

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
        //console.log("CDM: Updates Checked is " + this.state.updatesChecked);
        updateActions.checkUpdates();
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
                <div>{appUpdateAvailable.type}</div>
                <button className="left" type="submit" onClick={this.checkUpdates}><p>Check for updates</p></button>
            </section>

        );
    }
});

module.exports = Updater;
