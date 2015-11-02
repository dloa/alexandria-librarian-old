import alt from '../alt';
import updateActions from '../actions/updateActions';




class updaterStore {
    constructor() {
        this.bindActions(updateActions);
        this.errors = {};

        this.appUpdateAvailable = false; //these will be objects
        this.updatesChecked = false;
        this.daemonUpdatesAvailable = false;
        this.notificationShown = false;
    }

    onMainUpdateFound(update) {
        this.setState({
            appUpdateAvailable: update,
            //updatesChecked: true
        });
    }

    onDaemonUpdatesFound(updates) {
        this.setState({
            daemonUpdatesAvailable: updates,
            //updatesChecked: true
        });
    }

    onNotificationShown(shown){ // change to be triggered via an arg, so we can reset to false.
        this.setState({
            notificationShown: shown
        });
    }

    onUpdatesChecked(checked){
        this.setState({
            updatesChecked: checked
        });
        console.log("Setting updates checked to :", checked);
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
