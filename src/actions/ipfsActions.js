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

    pin() {
        this.dispatch();
        var pins = ifps.pinfiles();
        pins.on('pinned', function(file) {
            console.log(file)
        });
    }
    getPinned() {
        this.dispatch();
        ifps.getPinned();

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