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

        switch (action) {
            case 'enable':
                DaemonUtil.checkInstalled('ipfs')
                    .then(installed => {
                        if (installed) {
                            this.enable({
                                id: 'ipfs',
                                args: ['daemon']
                            })
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

    enable(daemon) {
        this.dispatch();

        this.actions.enabling({
            id: daemon.id,
            code: 2,
            percent: 0
        });

        let installPath = path.join(DaemonUtil.installDir, DaemonUtil.getExecName(daemon.id));

        let daemonObj = DaemonUtil.generate(installPath, daemon.args);

        daemonObj.start(pid => {
            this.actions.enabled({
                daemon: daemonObj,
                id: daemon.id,
                pid: pid
            });
        });

    }

    disable(daemon) {

    }


}

export
default alt.createActions(daemonEngineActions);