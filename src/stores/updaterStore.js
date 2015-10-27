import alt from '../alt';
import updateActions from '../actions/updateActions';




class updaterStore {
    constructor() {
        this.bindActions(updateActions);
        this.errors = {};

        this.appUpdateAvailable = false; //these will be objects
        this.updatesChecked = false;
        this.daemonUpdatesAvailable = false;
    }

    onMainUpdateFound(update) {
        this.setState({
            appUpdateAvailable: update,
            updatesChecked: true
        });
    }

    onDaemonUpdatesFound(updates) {
        this.setState({
            daemonUpdatesAvailable: updates,
            updatesChecked: true
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
default alt.createStore(updaterStore);
