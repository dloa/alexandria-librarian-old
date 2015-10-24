import ipc from 'ipc';
import alt from '../alt';
import ifps from '../utils/daemons/ipfsUtil';

class ipfsActions {

    constructor() {
        this.generateActions(
            'ipfsInstalled',
            'ipfsEnabled',
            'ipfsDisabled',
            'ipfsPinned'
        );
    }

    download() {
        this.dispatch();
        ifps.download()
    }

    install() {
        this.dispatch();
        ifps.install()
    }

    addFile() {
        this.dispatch();
        ifps.addFile();
    }

    pinRemote(hash) {
        this.dispatch();
        ifps.pinFile(hash)
    }

    pinlocal() {
        this.dispatch();
        ifps.pinlocalfiles();
    }

    getPinned() {
        this.dispatch();
        ifps.getPinned();
    }

    toggle(status) {
        this.dispatch();
        if (status)
            ifps.enable()
        else
            ifps.disable()
    }
}


export
default alt.createActions(ipfsActions);