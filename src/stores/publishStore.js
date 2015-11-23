import alt from '../alt';
import util from '../utils/util';
import publishActions from '../actions/publishActions';
import ReactUpdate from 'react-addons-update';


class publishStore {
    constructor() {
        this.bindActions(publishActions);

        this.youtubeAuthorization = false;
        this.youtubeContent = false;
        this.audioFiles = [];
    }
    
    onClearPublish() {
        this.setState({
            audioFiles: []
        });
    }

    onAudioFile(file) {
        this.setState({
            audioFiles: ReactUpdate(this.audioFiles, {
                $push: [file]
            })
        });
    }

    onYoutubeAuthorized(tokens) {
        this.setState({
            youtubeAuthorization: tokens
        });
    }

    onYoutubeContent(content) {
        this.setState({
            youtubeContent: content
        });
    }

}

export
default alt.createStore(publishStore);