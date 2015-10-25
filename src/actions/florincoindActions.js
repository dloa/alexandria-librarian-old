import alt from '../alt';

class FlorincoindActions {

    constructor() {
        this.generateActions(
            'florincoindInstalled',
            'florincoindEnabled'
        );
    }

    download() {
        var Florincoind = require('../utils/daemons/florincoindUtil');
        this.dispatch();
        Florincoind.download();
    }

    install() {
        var Florincoind = require('../utils/daemons/florincoindUtil');
        this.dispatch();
        Florincoind.install();
    }

    toggle(status) {
        var Florincoind = require('../utils/daemons/florincoindUtil');
        this.dispatch();
        if (status)
            Florincoind.enable();
        else
            Florincoind.disable();
    }

}

export
default alt.createActions(FlorincoindActions);