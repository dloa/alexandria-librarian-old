import alt from '../../alt'
import Actions from './actions';


class Store {
    constructor() {
        this.bindActions(Actions);

        this.files = {
            audio: [],
            extra: []
        };

    }

    onAddedFiles(file) {
        this.files.audio.push(file);
        this.setState({
            files: this.files
        });
    }

}

export
default alt.createStore(Store);