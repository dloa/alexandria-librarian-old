import ipc from 'ipc';
import alt from '../alt';
import ipfsUtil from '../utils/daemons/ipfsUtil';
import updaterUtil from '../utils/updaterUtil';


class updateActions {

    constructor() {
        this.generateActions(
            'mainUpdateFound',
            'daemonUpdatesFound',
            'notificationShown',
            'updatesChecked' // added to check if notification is already shown
        );
    }

    checkUpdates() {

        var UpdaterUtil = require('../utils/updaterUtil');
        this.dispatch();
        UpdaterUtil.checkUpdates();
    }

    download(hash, type) {
        var UpdaterUtil = require('../utils/updaterUtil');
        this.dispatch();
        UpdaterUtil.download(hash, type);
    }

    install(update, type) {
        var UpdaterUtil = require('../utils/updaterUtil');
        this.dispatch();

    }

}


export
default alt.createActions(updateActions);
