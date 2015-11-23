import alt from '../alt';
import util from '../utils/util';
import publishActions from '../actions/publishActions';


class publishStore {
    constructor() {
        this.bindActions(publishActions);

        this.youtubeAuthorization = false;
        this.youtubeContent = false;
        this.audioFies = [];
    }

    onAudioFile(file) {
        console.log(file);
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