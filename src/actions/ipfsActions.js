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
        ifps.install().then(() => {
            console.log('IPFS installed')
        });
    }

    addFile() {
        this.dispatch();
        ifps.addFile();
    }

    pinremote() {
        this.dispatch();
        var pins = ifps.pinlocalfiles();
        pins.on('pinned', function(file) {
            console.log(file)
        });
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
            ifps.enable().then(() => {
                console.log('IPFS enabled')
            });
        else
            ifps.disable().then(() => {
                console.log('IPFS disabled')
            });
    }
}


export
default alt.createActions(ipfsActions);