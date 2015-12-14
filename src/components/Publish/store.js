import alt from '../../alt'
import Actions from './actions';


class Store {
    constructor() {
        this.bindActions(Actions);

        this.files = [];

    }

    onAddedFiles(file) {
        this.files.push(file);

        console.log(this.files);
        this.setState({
            files: this.files
        });



    }

}

export
default alt.createStore(Store);