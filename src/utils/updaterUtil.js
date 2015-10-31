import Promise from 'bluebird';

import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import updateActions from '../actions/updateActions';
import notificationsUtil from '../utils/notifyUtil';
import updaterStore from '../stores/updaterStore';

module.exports = {

    checkUpdates: function() {

        Promise.all([this.checkDaemonUpdates(), this.checkAppUpdates(), this.getVersions()]).bind(this)
            .spread(function(daemons, app) {

                console.log(daemons, app)

            })
    },

    checkDaemonUpdates: function(daemonUpdateHash) {
        return new Promise((resolve, reject) => {
            ipfsUtil.cli(['cat', daemonUpdateHash ? daemonUpdateHash : 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM'])
                .then(function(result) {
                    resolve(JSON.parse(result).daemons);
                }).catch(function() {
                    reject({})
                });
        });
    },

    checkAppUpdates: function(appUpdateHash) {
        return new Promise((resolve, reject) => {
            ipfsUtil.cli(['cat', appUpdateHash ? appUpdateHash : 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM'])
                .then(function(result) {
                    resolve(JSON.parse(result).librarian);
                }).catch(function() {
                    reject({})
                });
        });
    },

    getVersions: function() {
        return new Promise((resolve, reject) => {
            ipfsUtil.cli(['cat', appUpdateHash ? appUpdateHash : 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM'])
                .then(function(result) {
                    resolve(JSON.parse(result).librarian);
                }).catch(function() {
                    reject({})
                });
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
            }, function() {
                updateActions.download('QmQoN4VjrneDTdJUfp3Yy8W5pFrHyZVWisWpQX82xw3n5Y', 'app');
            }); // 'app' is a placeholder for update type
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
        }
        if (type === 'libraryd') {
            notificationsUtil.notify({
                title: 'ΛLΞXΛNDRIΛ Librarian',
                message: 'Libraryd update available',
                sound: true
            });
            shown = true;
        }

    }
}