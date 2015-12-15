import alt from '../../alt'
import Actions from './actions';


class Store {
    constructor() {
        this.bindActions(Actions);

        this.audio = [];
        this.extra = [];

    }

    onAddedFiles(file) {
        this[file.type].push(file);
        this.setState({
            [file.type]: this[file.type]
        });
    }

}

export
default alt.createStore(Store);