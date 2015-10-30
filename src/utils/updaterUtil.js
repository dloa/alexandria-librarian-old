import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import updateActions from '../actions/updateActions';
import notificationsUtil from '../utils/notifyUtil';
import updaterStore from '../stores/updaterStore';

module.exports = {

    checkMainUpdate: function() {
        var mainUpdate = {};
        var updateHash = 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM';
        var appVersion = require('../../package.json').version;
        var latestVersion;
        ipfsUtil.cli(['cat', updateHash]).then(function(result) {
          console.log('in cli');
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

        }).catch(console.log('error with app cli'));
    },

    checkDaemonUpdates: function() {
        var daemonUpdates = {
          ipfs: {},
          libraryd: {}
        };
        var updateHash = 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM';

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

        }).catch(console.log('error with daemon cli'));
    },

    notify: function(type) {
      var shown;
      console.log(type);
        if(type === 'app'){
            notificationsUtil.notify({
                            title: 'ΛLΞXΛNDRIΛ Librarian',
                            message: 'App update available',
                            sound: true
                        }, updateActions.download('QmQoN4VjrneDTdJUfp3Yy8W5pFrHyZVWisWpQX82xw3n5Y', 'app')); // 'app' is a placeholder for update type
            shown = true;
            updateActions.notificationShown(shown); 
        }
        console.log(shown);
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