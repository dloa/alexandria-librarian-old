import alt from '../alt';
import Florincoind from '../utils/daemons/florincoindUtil';

class FlorincoindActions {

    constructor() {
        this.generateActions(
            'florincoindInstalled',
            'florincoindEnabled',
            'florincoindDisabled'
        );
    }

    download() {
        this.dispatch();
        Florincoind.download();
    }

    install() {
        this.dispatch();
        Florincoind.install();
    }

    toggle(status) {
        this.dispatch();
        if (status)
            Florincoind.enable();
        else
            Florincoind.disable();
    }

}

export
default alt.createActions(FlorincoindActions);