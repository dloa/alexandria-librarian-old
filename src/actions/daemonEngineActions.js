import alt from '../alt';
import path from 'path';
import DaemonUtil from '../utils/daemonEngineUtil';

/*
installing codes:

1 = checking    - exsistance
2 = installing  - to bin
3 = installed   - <.<
4 = enabling    - >.>                           
5 = updating    - can be daemon or bootstrap    w/ info key
6 = syncing     - block chain                  
7 = done        - if you dont know what this means close the tab.   
8 = error       - w/ error: key for.. info.
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
                //TODO
                break;
            case 'install':
                DaemonUtil.install({
                    id: 'ipfs',
                    args: ['init']
                }).then(installed => {
                    if (installed)
                        this.actions.ipfs('enable');
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