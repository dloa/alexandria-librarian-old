import util from './util';
import ipfsUtil from './ipfsUtil';
import updateActions from '../actions/updateActions';

module.exports = {
    checkForUpdates: function() {
        console.log("updaterUtil checkForUpdates called!!!");
        ipfsUtil.cli("ipfs cat Qme1JTA5JnRM64CAyn4uLmGXhuiZg5Zhae5J4aKa86aMKx");
    },

    checkMainUpdate: function() {
        var mainUpdate = {};
        updateActions.mainUpdateFound('mainUpdate');
    },

    checkDaemonUpdates: function() {
        var daemonUpdates = [];
        updateActions.daemonUpdatesFound('daemonUpdates');
    }
}
