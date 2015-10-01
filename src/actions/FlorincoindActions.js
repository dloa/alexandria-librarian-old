import ipc from 'ipc';
import alt from '../alt';
import Florincoind from '../utils/FlorincoindUtil';

class FlorincoindActions {

    download() {
        this.dispatch();
        Florincoind.download()
            .then((DLpath) => {
                console.info('download saved to', DLpath);
            })
            .catch((error) => {
                console.error('Unable to download', error);
            });
    }

    install() {
        this.dispatch();
        Florincoind.install()
            .then(() => {
                console.log('Florincoind installed');
            })
    }
    
    toggle(status) {
        this.dispatch();
        if (status)
            Florincoind.enable().then(() => {
                console.log('Florincoind enabled');
            });
        else
            Florincoind.disable().then(() => {
                console.log('Florincoind disabled');
            });
    }

}

export
default alt.createActions(FlorincoindActions);