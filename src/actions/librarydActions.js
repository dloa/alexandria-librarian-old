import alt from '../alt';
import libraryd from '../utils/daemons/libarydUtil';

class librarydActions {

    constructor() {
        this.generateActions(
            'librarydInstalled',
            'librarydEnabled',
            'librarydDisabled'
        );
    }

    download() {
        this.dispatch();
        libraryd.download()
    }

    install() {
        this.dispatch();
        libraryd.install();
    }

    toggle(status) {
        this.dispatch();
        if (status)
            libraryd.enable();
        else
            libraryd.disable()
    }

}

export
default alt.createActions(librarydActions);