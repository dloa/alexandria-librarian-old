import alt from '../alt'

class publishingActions {

    constructor() {
        this.generateActions(
            'youtubeAuthorized'
        );
    }

    authorize(service) {
        this.dispatch();

        switch (service) {
            case 'youtube':
                require('../utils/publishing/youtubeUtil').getAuthorization();
                break;
        }
    }
}


export
default alt.createActions(publishingActions);