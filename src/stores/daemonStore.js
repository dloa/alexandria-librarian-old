import alt from '../alt';
import ipfsActions from '../actions/ipfsActions';


class daemonStore {
    constructor() {
        this.bindActions(ipfsActions);

        this.errors = {};
        
        this.ipfsInstalled = false;
        this.ipfsEnabled = false;

    }

    onIpfsStatus(status) {
        this.setState({
            ipfsEnabled: status
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