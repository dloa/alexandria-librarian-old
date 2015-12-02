import alt from '../../../alt';
import Actions from './actions';



class Store {
    constructor() {
        this.bindActions(Actions);


    }

    onPin(hash) {
        this.setState(setting);
    }


}

export
default alt.createStore(Store);