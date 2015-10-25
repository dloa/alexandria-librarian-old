import alt from '../alt';
import updateActions from '../actions/updateActions';




class daemonStore {
    constructor() {
        this.bindActions(updateActions);
        this.errors = {};

        this.appUpdateAvailable = false; //these will be objects

        this.daemonUpdatesAvailable = false;
    }

    onMainUpdateFound(update) {
        this.setState({
            appUpdateAvailable: update
        });
    }

    onDaemonUpdatesFound(updates) {
        this.setState({
            daemonUpdatesAvailable: updates,
        });
    }


    errors({
        errors
    }) {
        this.setState({
            errors
        });
    }

}

export
default alt.createStore(daemonStore);
