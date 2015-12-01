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

    onUpdate(daemon) {
        let enabled = this.enabled;
        enabled[daemon.id][daemon.key] = daemon[daemon.key];
        this.setState({
            enabled: enabled
        });
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
    }

    onDisabled(daemon) {
        this.setState({
            enabled: _.omit(this.enabled, daemon),
            enabling: _.omit(this.enabling, daemon)
        });
    }

}

export
default alt.createStore(DaemonEngineStore);