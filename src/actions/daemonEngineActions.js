import alt from '../alt';
import path from 'path';
import DaemonUtil from '../utils/daemonEngineUtil';


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
                        if (installed)
                            DaemonUtil.enable({
                                id: 'ipfs',
                                args: ['daemon']
                            });
                        else
                            this.actions.ipfs('install');
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