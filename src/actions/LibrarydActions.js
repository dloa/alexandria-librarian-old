import ipc from 'ipc';
import alt from '../alt';
import libraryd from '../utils/libarydUtil';

class librarydActions {

    download() {
        this.dispatch();
        libraryd.download()
            .then((DLpath) => {
                console.info('download saved to', DLpath);
            })
            .catch((error) => {
                console.error('Unable to download', error);
            });
    }

    install() {
        this.dispatch();
        return libraryd.install();
    }

    toggle(status) {
        this.dispatch();
        if (status)
            return libraryd.enable();
        else
            return libraryd.disable()
    }

}

export
default alt.createActions(librarydActions);