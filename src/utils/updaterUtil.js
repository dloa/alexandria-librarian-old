import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import updateActions from '../actions/updateActions';

module.exports = {

    checkMainUpdate: function() {
        var mainUpdate = {};
        var updateHash = 'QmWE615QhdawJcwiBhaXyggyViv9GG9W9GfbN8rmRJmGdq';
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
              updateActions.mainUpdateFound(mainUpdate);
          }

        }).catch(console.log("Error checking for app update"));
    },

    checkDaemonUpdates: function() {
        var daemonUpdates = {
          ipfs: {},
          libraryd: {}
        };
        var updateHash = 'QmWE615QhdawJcwiBhaXyggyViv9GG9W9GfbN8rmRJmGdq';

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
          updateActions.daemonUpdatesFound(daemonUpdates);

        }).catch(console.log("Error checking for daemon updates"));
    }
}
