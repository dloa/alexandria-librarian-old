import alt from '../alt';
import path from 'path';
import DaemonUtil from '../utils/daemonEngine';


class daemonEngineActions {

    constructor() {
        this.generateActions(
            'update',

            'enabled',
            'disabled',

            'enabling',
            'disabling'
        );
    }

    ipfs(action, params) {

        this.dispatch();

        let installPath = path.join(DaemonUtil.installDir, DaemonUtil.getExecName('ipfs'));

        switch (action) {
            case 'enable':
                DaemonUtil.checkInstalled('ipfs')
                    .then(installed => {
                        if (installed) {
                            this.actions.enabling({
                                id: 'ipfs',
                                code: 2,
                                percent: 0
                            });

                            let daemon = DaemonUtil.generate(installPath, ['daemon']);

                            daemon.start(pid => {
                                this.actions.enabled({
                                    daemon: daemon,
                                    id: 'ipfs',
                                    pid: pid
                                });
                            });
                        } else
                            this.ipfs('install');
                    });
                break;
            case 'disable':

                break;

            case 'install':
                this.actions.enabling({
                    id: 'ipfs',
                    code: 1,
                    percent: 0
                });

                break;
        }
    }


    florincoin(action, params) {


    }


    libraryd(action, params) {



    }


}

export
default alt.createActions(daemonEngineActions);