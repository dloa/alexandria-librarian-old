import alt from '../../alt'

class publishingActions {

    constructor() {
        this.generateActions(
        	'setMeta',
        	'addedFiles',
            'youtubeAuthorized',
            'youtubeContent'
        );
    }

    processFiles(files){

    	
    }

    authorize(service) {
        this.dispatch();

        switch (service) {
            case 'youtube':
                require('./utils/youtubeUtil').getAuthorization()
                    .then(() => {
                        this.actions.getContent('youtube');
                    });
                break;
        }
    }

    getContent(service) {
        this.dispatch();

        switch (service) {
            case 'youtube':
                require('./utils/youtubeUtil').getContent();
                break;
        }
    }

}


export
default alt.createActions(publishingActions);