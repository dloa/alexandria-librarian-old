import alt from '../alt';


class librarydActions {

    constructor() {
        this.generateActions(
            'librarydInstalled',
            'librarydEnabled'
        );
    }

    download() {
        var libraryd = require('../utils/daemons/libarydUtil');
        this.dispatch();
        libraryd.download()
    }

    install() {
        var libraryd = require('../utils/daemons/libarydUtil');
        this.dispatch();
        libraryd.install();
    }

    toggle(status) {
        var libraryd = require('../utils/daemons/libarydUtil');
        this.dispatch();
        if (status)
            libraryd.enable();
        else
            libraryd.disable()
    }

    checkRunning() {
        var libraryd = require('../utils/daemons/libarydUtil');

        this.dispatch();
        libraryd.checkRunning()
    }

}

export
default alt.createActions(librarydActions);