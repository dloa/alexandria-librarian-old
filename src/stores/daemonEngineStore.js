import alt from '../alt';
import _ from 'lodash';
import updateState from 'react-addons-update';
import DaemonEngineActions from '../actions/daemonEngineActions';



class DaemonEngineStore {
    constructor() {
        this.bindActions(DaemonEngineActions);

        this.enabling = {};
        this.disabling = {};

        this.enabled = {};

    }

    onEnabling(daemon) {
        let enabling = this.enabling;
        enabling[daemon.id] = _.omit(daemon, 'id');
        this.setState({
            enabling: enabling
        });
    }

}

export
default alt.createStore(DaemonEngineStore);