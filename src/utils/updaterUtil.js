import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import updateActions from '../actions/updateActions';

module.exports = {
    checkForUpdates: function() {
        console.log("updaterUtil checkForUpdates called!!!");

        // This is the new updated json hash. Putting it here for visibility
        var newHash = "QmWE615QhdawJcwiBhaXyggyViv9GG9W9GfbN8rmRJmGdq";
    },

    // This and daemon update function could probably be combined
    checkMainUpdate: function() {
        var mainUpdate = {};
        var updateHash = 'Qme1JTA5JnRM64CAyn4uLmGXhuiZg5Zhae5J4aKa86aMKx';
        var appVersion = require('../../package.json').version
        var latestVersion;

        ipfsUtil.cli(['cat', updateHash]).then(function(result) {
          var data = JSON.parse(result);
          latestVersion = data.App.version;

          if(latestVersion !== appVersion){
              mainUpdate = {
                  hash: data.App.hash,
                  type: 'app'
              };

              console.log(mainUpdate);
              updateActions.mainUpdateFound(mainUpdate);
          }
          else
              return false; // handle error here
        });
    },

    checkDaemonUpdates: function() {
        var daemonUpdates = {};
        var updateHash = 'Qme1JTA5JnRM64CAyn4uLmGXhuiZg5Zhae5J4aKa86aMKx'
        var daemonVersion = require('../../package.json').version
        var latestVersion;

        ipfsUtil.cli(['cat', updateHash]).then(function(result) {
          var data = JSON.parse(result);
          latestVersion = data.daemons.LA.version;

          if(latestVersion !== daemonVersion){
              daemonUpdates = {
                  hash: data.daemons.LA.hash,
                  type: 'daemon'
              };

              console.log(daemonUpdates);
              updateActions.daemonUpdatesFound(daemonUpdates);
          }
          else
              return false; // handle error here
        });
    }
}
