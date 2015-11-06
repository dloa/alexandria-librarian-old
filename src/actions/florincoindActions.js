import alt from '../alt';

class FlorincoindActions {

    constructor() {
        this.generateActions(
            'florincoindEnabled',
            'florincoindStats'
        );
    }

    getStats() {
        var Florincoind = require('../utils/daemons/florincoindUtil');

        this.dispatch();
        Florincoind.getStats();
    }

    toggle(status) {
        var Florincoind = require('../utils/daemons/florincoindUtil');
        this.dispatch();
        if (status)
            Florincoind.enable();
        else
            Florincoind.disable();
    }

    checkRunning() {
        var Florincoind = require('../utils/daemons/florincoindUtil');
        this.dispatch();
        Florincoind.checkRunning();
    }

}

export
default alt.createActions(FlorincoindActions);