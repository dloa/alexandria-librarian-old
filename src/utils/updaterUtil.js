import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import updateActions from '../actions/updateActions';
import notificationsUtil from '../utils/notifyUtil';
import updaterStore from '../stores/updaterStore';

module.exports = {

    checkMainUpdate: function() {
        var mainUpdate = {};
        var updateHash = 'QmeixMvtfTVzHFxL6oGhgQTqsJoJNk2RJBr4dSwjppcYMr';
        var appVersion = require('../../package.json').version;
        var latestVersion;
        ipfsUtil.cli(['cat', updateHash]).then(function(result) {
          var data = JSON.parse(result);
          latestVersion = data.librarian.version;
          if(appVersion !== latestVersion){
              mainUpdate = {
                  hash: data.librarian.ipfsHash,
                  type: 'app'
              };

              console.log(mainUpdate);
              console.log("Check main finished");
              updateActions.mainUpdateFound(mainUpdate);
          }

        });
    },

    checkDaemonUpdates: function() {
        var daemonUpdates = {
          ipfs: {},
          libraryd: {}
        };
        var updateHash = 'QmeixMvtfTVzHFxL6oGhgQTqsJoJNk2RJBr4dSwjppcYMr';

        var ipfsVersion = "1.2.3";
        var librarydVersion = "1.2.3";

        var latestIpfsVersion;
        var latestLibrarydVersion;


        ipfsUtil.cli(['cat', updateHash]).then(function(result) {
          var data = JSON.parse(result);
          latestIpfsVersion = data.daemons.ipfs.version;
          latestLibrarydVersion = data.daemons.libraryd.version;

          if(ipfsVersion !== latestIpfsVersion){
              daemonUpdates.ipfs = {
                  hash: data.daemons.ipfs.ipfsHash,
                  type: 'ipfs'
              };

          }
          if(librarydVersion !== latestLibrarydVersion){
              daemonUpdates.libraryd = {
                  hash: data.daemons.libraryd.ipfsHash,
                  type: 'libraryd'
              };
          }
          console.log(daemonUpdates);
          console.log("Check daemons finished");
          updateActions.daemonUpdatesFound(daemonUpdates);

        });
    },

    notify: function(type) {
      var showing;
      console.log(type);
        if(type === 'app'){
            notificationsUtil.notify({
                            title: 'ΛLΞXΛNDRIΛ Librarian',
                            message: 'App update available',
                            sound: true
                        });
            showing = true;
            updateActions.notificationShown(showing); // to add dl and install as well as args
        }
        console.log(showing);
        if(updaterStore.daemonUpdatesAvailable){
            if(type === 'ipfs'){
                notificationsUtil.notify({
                            title: 'ΛLΞXΛNDRIΛ Librarian',
                            message: 'IPFS update available!',
                            sound: true
                        });
                updateActions.notificationShown();
            }
            if(type === 'libraryd'){
                notificationsUtil.notify({
                            title: 'ΛLΞXΛNDRIΛ Librarian',
                            message: 'Libraryd update available',
                            sound: true
                        });
                updateActions.notificationShown();
            }
        }
    }
}