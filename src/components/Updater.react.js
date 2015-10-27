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
    update: function(){
        if(this.state.appUpdateAvailable){
            //not correct, just placeholders for time being
            var update = updateActions.download('Qme1JTA5JnRM64CAyn4uLmGXhuiZg5Zhae5J4aKa86aMKx', app);
            updateActions.install(update, app);
        }
        if(this.state.daemonUpdatesAvailable){
            //not correct, just placeholders for time being
            var update = updateActions.download('Qme1JTA5JnRM64CAyn4uLmGXhuiZg5Zhae5J4aKa86aMKx', daemon);
            updateActions.install(update, daemon);
        }
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
