import alt from '../alt'

class publishingActions {

    constructor() {
        this.generateActions(
            'youtubeAuthorized',
            'youtubeContent'
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

    getContent(service) {
        this.dispatch();

        switch (service) {
            case 'youtube':
                require('../utils/publishing/youtubeUtil').getContent();
                break;
        }
    }

}


export
default alt.createActions(publishingActions);