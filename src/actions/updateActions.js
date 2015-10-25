import ipc from 'ipc';
import alt from '../alt';


class updateActions {

    constructor() {
        this.generateActions(
            'mainUpdateFound',
            'daemonUpdatesFound'
        );
    }


    download(hash, type) {
        var UpdaterUtil = require('../utils/updaterUtil');

        this.dispatch();

    }

    install(update, type) {
        var UpdaterUtil = require('../utils/updaterUtil');
        this.dispatch();


    }

}


export
default alt.createActions(updateActions);
