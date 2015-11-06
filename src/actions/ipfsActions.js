import alt from '../alt'



class ipfsActions {

    constructor() {
        this.generateActions(
            'ipfsEnabled',
            'ipfsPinned',
            'ipfsStats'
        );
    }

    checkRunning() {
        var ipfsUtil = require('../utils/daemons/ipfsUtil');

        this.dispatch();
        ipfsUtil.checkRunning()
    }

    addFile() {
        var ipfsUtil = require('../utils/daemons/ipfsUtil');

        this.dispatch();
        ipfsUtil.addFile();
    }

    pinRemote(hash) {
        var ipfsUtil = require('../utils/daemons/ipfsUtil');

        this.dispatch();
        ipfsUtil.pinFile(hash)
    }

    pinlocal() {
        var ipfsUtil = require('../utils/daemons/ipfsUtil');

        this.dispatch();
        ipfsUtil.pinlocalfiles();
    }

    getPinned() {
        var ipfsUtil = require('../utils/daemons/ipfsUtil');

        this.dispatch();
        ipfsUtil.getPinned();
    }

    toggle(status) {
        var ipfsUtil = require('../utils/daemons/ipfsUtil');

        this.dispatch();
        if (status)
            ipfsUtil.enable()
        else
            ipfsUtil.disable()
    }

    getStats() {
        var ipfsUtil = require('../utils/daemons/ipfsUtil');

        this.dispatch();
        ipfsUtil.getStats();
    }
}


export
default alt.createActions(ipfsActions);