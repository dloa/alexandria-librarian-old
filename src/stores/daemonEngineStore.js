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

    onEnabled(daemon) {
        let enabled = this.enabled;
        enabled[daemon.id] = _.omit(daemon, 'id');
        this.setState({
            enabled: enabled
        });

        _.defer(DaemonEngineActions.enabling.bind(this, {
            id: daemon.id,
            code: 7
        }));
    }

}

export
default alt.createStore(DaemonEngineStore);