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
                console.log('Florincoind installed')
            })
    }


}

export
default alt.createActions(FlorincoindActions);