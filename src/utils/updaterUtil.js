import Promise from 'bluebird';

import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import updateActions from '../actions/updateActions';
import notificationsUtil from '../utils/notifyUtil';
import updaterStore from '../stores/updaterStore';

module.exports = {
    checkUpdates: function() {

        Promise.all([this.checkDaemonUpdates(), this.checkAppUpdates(), this.getVersions()])
            .spread(function(daemons, app, versions) {
                if (daemons.status !== 'ok' || app.status !== 'ok')
                    this.notify('error', (daemons.status !== 'ok') ? 'Daemons' : 'App');

                console.log(daemons, app, versions)

                //Logic to compaire stuff here.
            }.bind(this))
    },

    checkDaemonUpdates: function(daemonUpdateHash) {
        return new Promise((resolve, reject) => {
            ipfsUtil.cli(['cat', daemonUpdateHash ? daemonUpdateHash : 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM'])
                .then(function(result) {
                    result = JSON.parse(result).daemons;
                    result['status'] = 'ok';
                    resolve(result);
                }).catch(function() {
                    reject({})
                });
        });
    },

    checkAppUpdates: function(appUpdateHash) {
        return new Promise((resolve, reject) => {
            ipfsUtil.cli(['cat', appUpdateHash ? appUpdateHash : 'QmUKQ12KJrn8ybw7Q4WTqmVrn51kadAZdM7JDaR28AiXnM'])
                .then(function(result) {
                    result = JSON.parse(result).librarian;
                    result['status'] = 'ok';
                    resolve(result);
                }).catch(function() {
                    reject({
                        status: 'error'
                    })
                });
        });
    },

    getVersions: function() {
        return new Promise((resolve, reject) => {
            Promise.all([ipfsUtil.cli(['version'])])
                .spread(function(ipfs) {
                    resolve({
                        ipfs: ipfs.replace('\n', '').replace('ipfs version ', ''),

                    })
                })
        });
    },

    notify: function(type, content, runFunc) {
        notificationsUtil.notify({
            title: 'ΛLΞXΛNDRIΛ Librarian',
            message: ((type === 'info') ? 'Update Installed: ' : ((type === 'available') ? 'Update Installed: ' : 'Error checking updates for: ')) + content,
            sound: true
        }, runFunc ? runFunc : (function() {}));
    }
}