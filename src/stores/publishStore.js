import alt from '../alt';
import util from '../utils/util';
import ipfsActions from '../actions/ipfsActions';




class daemonStore {
    constructor() {
        this.bindActions(ipfsActions);

        this.errors = {};

        this.youtubeAuthorization = false;

    }


    onYoutubeAuthorized(youtubeAuthorization) {
        this.setState({
            youtubeAuthorization: youtubeAuthorization
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