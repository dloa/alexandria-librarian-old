import alt from '../alt';
import util from '../utils/util';
import publishActions from '../actions/publishActions';


class publishStore {
    constructor() {
        this.bindActions(publishActions);

        this.errors = {};

        this.youtubeAuthorization = false;
        this.youtubeContent = false;

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

    errors({
        errors
    }) {
        this.setState({
            errors
        });
    }

}

export
default alt.createStore(publishStore);