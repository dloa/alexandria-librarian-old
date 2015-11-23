import alt from '../alt'

class publishingActions {

    constructor() {
        this.generateActions(
            'youtubeAuthorized',
            'youtubeContent',
            'addFile'
        );
    }

    authorize(service) {
        this.dispatch();
        switch (service) {
            case 'youtube':
                require('../utils/publishing/youtubeUtil').getAuthorization()
                    .then(() => {
                        this.actions.getContent('youtube');
                    });
                break;
        }
    }

    addFiles(files) {
        var audioUtil = require('../utils/publishing/audioUtil');
        this.dispatch();
        audioUtil.eventEmitter.on('file', this.actions.addFile);
        audioUtil.addFiles(files);
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