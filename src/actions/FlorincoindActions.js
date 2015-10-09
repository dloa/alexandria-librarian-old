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
        return Florincoind.install()
    }
    
    toggle(status) {
        this.dispatch();
        if (status)
            return Florincoind.enable()
        else
            return Florincoind.disable()
    }

}

export
default alt.createActions(FlorincoindActions);