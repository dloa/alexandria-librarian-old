import ipc from 'ipc';
import alt from '../alt';
import ifps from '../utils/ipfsUtil';

class ipfsActions {

    download() {
        this.dispatch();
        ifps.download()
            .then((DLpath) => {
                console.info('download saved to', DLpath);
            })
            .catch((error) => {
                console.error('Unable to download', error);
            });
    }

    install() {
        this.dispatch();
        return ifps.install()
    }

    addFile() {
        this.dispatch();
        ifps.addFile();
    }

    pinRemote(hash) {
        this.dispatch();
        return ifps.pinFile(hash)
    }

    pinlocal() {
        this.dispatch();
        var pins = ifps.pinlocalfiles();
        pins.on('pinned', function(file) {
            console.log(file)
        });
    }

    getPinned() {
        this.dispatch();
        return new Promise((resolve) => {
            ifps.getPinned().then(resolve)
        });

    }

    toggle(status) {
        this.dispatch();
        if (status)
            return ifps.enable()
        else
            return ifps.disable()
    }
}


export
default alt.createActions(ipfsActions);