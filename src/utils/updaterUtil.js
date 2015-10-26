import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import updateActions from '../actions/updateActions';

module.exports = {
    checkForUpdates: function() {
        console.log("updaterUtil checkForUpdates called!!!");
    },

    checkMainUpdate: function() {
        // var mainUpdate = {};
        // updateActions.mainUpdateFound('mainUpdate');
        var appVersion = require('../../package.json').version
        var latestVersion;

        ipfsUtil.cli(['cat', 'Qme1JTA5JnRM64CAyn4uLmGXhuiZg5Zhae5J4aKa86aMKx']).then(function(result){
          var data = JSON.parse(result);
          latestVersion = data.App.version;
          console.log(latestVersion);
          if(latestVersion !== appVersion)
          return true;
          // trigger update here
          else return false;
        });
    },

    checkDaemonUpdates: function() {
        // var daemonUpdates = [];
        // updateActions.daemonUpdatesFound('daemonUpdates');
        var daemonVersion = require('../../package.json').version
        var latestVersion;

        ipfsUtil.cli(['cat', 'Qme1JTA5JnRM64CAyn4uLmGXhuiZg5Zhae5J4aKa86aMKx']).then(function(result){
          var data = JSON.parse(result);
          latestVersion = data.daemons.LA.version;
          console.log(latestVersion);
          if(latestVersion !== daemonVersion)
          console.log("Update required");
          // trigger update here
          else console.log("Up to date");
        });       
    }
}
