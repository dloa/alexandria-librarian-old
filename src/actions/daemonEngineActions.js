import alt from '../alt';
import path from 'path';
import DaemonUtil from '../utils/daemonEngineUtil';
import IPFSUtil from '../utils/daemon/ipfs';


/*

installing codes:

0 = disabled	- disabled
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

            'enabling'
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
                DaemonUtil.disable('ipfs');
                break;
            case 'pinned-total':
                IPFSUtil.refreshStats(params).then(this.actions.update);
                break;
            case 'refresh-stats':
                IPFSUtil.refreshStats().then(this.actions.update);
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