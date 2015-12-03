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
        enabling[daemon.id] = _.omit(daemon, 'id', 'update');

        if (daemon.code === 8) {
            this.setState({
                enabled: _.omit(this.enabled, daemon.id),
                enabling: enabling
            });
        } else {
            if (daemon.update) {
                let enabled = this.enabled;
                enabled[daemon.id][daemon.update.key] = daemon.update[daemon.update.key];
                this.setState({
                    enabled: enabled,
                    enabling: enabling
                });
            } else {
                this.setState({
                    enabling: enabling
                });
            }

        }
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