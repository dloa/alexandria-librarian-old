import alt from '../alt';
import externalActions from '../actions/externalActions';


class externalStore {
    constructor() {
        this.bindActions(externalActions);

        this.errors = {};

        this.license = 'Loading...';
        this.contributors = 'Loading...';
        this.version = '';
        this.loaded = false;

    }


    onGotLicense(license) {
        this.setState({
            license: state
        });
    }

    onGotContributors(contributors) {
        this.setState({
            contributors: contributors
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
default alt.createStore(externalStore);