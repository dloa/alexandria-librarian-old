import alt from '../../../alt';
import Actions from './actions';


class Store {
    constructor() {
        this.bindActions(Actions);

        this.pinned = {};
    }

    onPined(pin) {
        let pinned = this.pinned;
        pinned[pin.hash] = pin;
        this.setState({
            pinned: pinned
        });
    }


}

export
default alt.createStore(Store);