import alt from '../alt';
import ipfsActions from '../actions/ipfsActions';
import florincoindActions from '../actions/florincoindActions';
import librarydActions from '../actions/librarydActions';



class daemonStore {
    constructor() {
        this.bindActions(ipfsActions);
        this.bindActions(florincoindActions);
        this.bindActions(librarydActions);

        this.errors = {};

        this.ipfsInstalled = false;
        this.ipfsEnabled = false;
    }

    onIpfsEnabled() {
        this.setState({
            ipfsEnabled: true
        });
    }

    onIpfsDisabled() {
        this.setState({
            ipfsEnabled: false
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