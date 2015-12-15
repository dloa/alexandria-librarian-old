import alt from '../../alt'
import Actions from './actions';


class Store {
    constructor() {
        this.bindActions(Actions);

        this.audio = [];
        this.extra = [];

    }

    onAddedFiles(file) {
        this.audio.push(file);
        this.setState({
            audio: this.audio
        });
    }

}

export
default alt.createStore(Store);