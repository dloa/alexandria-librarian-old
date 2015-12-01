import alt from '../alt';
import _ from 'lodash';
import DaemonEngineActions from '../actions/daemonEngineActions';



class DaemonEngineStore {
    constructor() {
        this.bindActions(DaemonEngineActions);

        this.enabling = {};
        this.disabling = {};

        this.enabled = {};

    }

    onUpdate(update) {
        let enabled = this.enabled;
        enabled[update.id][update.key] = update[update.key];
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