import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import updateActions from '../actions/updateActions';
import notificationsUtil from '../utils/notifyUtil';
import updaterStore from '../stores/updaterStore';

module.exports = {

    checkUpdates: function() {

        //Variables

        //app variables
        var appUpdate = {};
        var appUpdateHash = 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM';
        var appVersion = require('../../package.json').version;
        var latestAppVersion;

        // daemon variables
        var daemonUpdates = {
            ipfs: {},
            libraryd: {}
        };
        var daemonUpdateHash = 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM';
        var ipfsVersion = "1.2.3";
        var librarydVersion = "1.2.3";
        var latestIpfsVersion;
        var latestLibrarydVersion;


        // CLIs

        // app Update cli
        ipfsUtil.cli(['cat', appUpdateHash]).then(function(result) {
            var data = JSON.parse(result);
            latestAppVersion = data.librarian.version;
            if (appVersion !== latestAppVersion) {
                appUpdate = {
                    hash: data.librarian.ipfsHash,
                    type: 'app'
                };

                console.log(appUpdate);
                updateActions.mainUpdateFound(appUpdate);
                updateActions.updatesChecked(true);
            }
        }).catch(function(err, response) {
            console.log("Error while checking for app update:\n" + err);
        });

        //daemon update cli
        ipfsUtil.cli(['cat', daemonUpdateHash]).then(function(result) {
            var data = JSON.parse(result);
            latestIpfsVersion = data.daemons.ipfs.version;
            latestLibrarydVersion = data.daemons.libraryd.version;

            if (ipfsVersion !== latestIpfsVersion) {
                daemonUpdates.ipfs = {
                    hash: data.daemons.ipfs.ipfsHash,
                    type: 'ipfs'
                };

            }
            if (librarydVersion !== latestLibrarydVersion) {
                daemonUpdates.libraryd = {
                    hash: data.daemons.libraryd.ipfsHash,
                    type: 'libraryd'
                };
            }
            console.log(daemonUpdates);
            updateActions.daemonUpdatesFound(daemonUpdates);
            updatedActions.updatesChecked(true);
        }).catch(function() {
            console.log("Error while checking for daemon updates");
        });
    },
    notify: function(type) {
        var shown;
        console.log("Notify type: " + type);
        if (type === 'app') {
            notificationsUtil.notify({
                title: 'ΛLΞXΛNDRIΛ Librarian',
                message: 'App update available',
                sound: true
            }, updateActions.download('QmQoN4VjrneDTdJUfp3Yy8W5pFrHyZVWisWpQX82xw3n5Y', 'app')); // 'app' is a placeholder for update type
            shown = true;
            updateActions.notificationShown(shown);
        }
        //console.log(shown);
        if (type === 'ipfs') {
            notificationsUtil.notify({
                title: 'ΛLΞXΛNDRIΛ Librarian',
                message: 'IPFS update available!',
                sound: true
            });
            shown = true;
            updateActions.notificationShown(shown);
        }
        if (type === 'libraryd') {
            notificationsUtil.notify({
                title: 'ΛLΞXΛNDRIΛ Librarian',
                message: 'Libraryd update available',
                sound: true
            });
            shown = true;
            updateActions.notificationShown(shown);
        }

    }
}