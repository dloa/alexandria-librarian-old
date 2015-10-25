import alt from '../alt'

class externalActions {

    constructor() {
        this.generateActions(
            'gotLicense',
            'gotContributors',
            'gotVersion'
        );
    }

    getLisence() {
        this.dispatch();
        require('../utils/aboutUtil').getLisence();
    }

    getContributors() {
        this.dispatch();
        require('../utils/aboutUtil').getContributors();
    }
}


export
default alt.createActions(externalActions);