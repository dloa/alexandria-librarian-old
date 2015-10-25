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

        this.florincoindInstalled = false;
        this.florincoindEnabled = false;

        this.librarydInstalled = false;
        this.librarydEnabled = false;
    }

    onLibrarydInstalled() {
        this.setState({
            librarydInstalled: true
        });
    }

    onLibrarydEnabled(state) {
        this.setState({
            librarydEnabled: state
        });
    }

    onIpfsInstalled() {
        this.setState({
            ipfsInstalled: true
        });
    }

    onIpfsEnabled(state) {
        this.setState({
            ipfsEnabled: state
        });
    }

    onFlorincoindInstalled() {
        this.setState({
            florincoindInstalled: true
        });
    }

    onFlorincoindEnabled(state) {
        this.setState({
            florincoindEnabled: state
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