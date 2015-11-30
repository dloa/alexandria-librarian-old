import alt from '../alt';
import path from 'path';
import DaemonUtil from '../utils/daemonEngineUtil';

/*
installing codes:

1 = checking    - exsistance
2 = installing  - to bin
3 = enabling    - >.>                           w/ percent done key 
4 = updating    - can be daemon or bootstrap    w/ info key
5 = syncing     - block chain                   w/ percent done key
6 = done        - if you dont know what this means close the tab.   
7 = error       - w/ error: key for.. info.
*/

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
                DaemonUtil.install({
                    id: 'ipfs',
                    args: ['init']
                }).then(installed => {
                    if (installed) {
                        this.actions.enabling({
                            id: 'ipfs',
                            code: 5,
                            percent: 0
                        });
                    } else {
                        this.actions.enabling({
                            id: 'ipfs',
                            code: 6,
                            error: 'Install Failed'
                        });
                    }
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