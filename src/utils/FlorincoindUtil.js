import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import fs from 'fs';
import util from './Util';
import remote from 'remote';
import Settings from '../utils/SettingsUtil';

let dialog = remote.require('dialog');
let app = remote.require('app');
let AppData = path.join(app.getPath('appData'), 'Alexandria-Librarian');

module.exports = {
    download: function() {
        // To be done later.
    },
    install: function(tmppath) {
        var os = util.getOS();
        return new Promise((resolve, reject) => {
            util.copyfile(path.join(process.cwd(), 'bin', os, (os === 'win') ? 'florincoind.exe' : 'florincoind'), path.join(AppData, 'bin', (os === 'win') ? 'florincoind.exe' : 'florincoind'))
                .then(resolve)
                .catch(reject);
        });
    },
    saveConf: function(params) {
        var AutoGenPass = util.generatePassword(125);
        Settings.save('Florincoind-username', 'admin');
        Settings.save('Florincoind-password', AutoGenPass);
        var FlorincoinTmp = path.join(app.getPath('appData'), 'Florincoin');
        return new Promise((resolve, reject) => {
            util.createDir(FlorincoinTmp)
                .then(function() {

                })
                .then(resolve)
                .catch(reject);
        });
    },
    enable: function() {
        if (!Settings.get('Florincoind-username') || !Settings.get('Florincoind-password')) {
            dialog.showMessageBox({
                title: 'Alexandria-Librarian: Information',
                message: 'No RPC username/password found for Florincoin Wallet',
                detail: 'Username & password will be auto generated. See preferences for more info.',
                buttons: ['OK']
            });
            this.saveConf();
        }
        this.daemon = util.child(path.join(AppData, 'bin', (util.getOS() === 'win') ? 'florincoind.exe' : 'florincoind'), ['daemon']);
        return new Promise((resolve, reject) => {
            try {
                this.daemon.start(function(pid) {
                    resolve(pid);
                });
            } catch (e) {
                reject(e);
            }
        });
    },
    disable: function() {
        return new Promise((resolve, reject) => {
            try {
                this.daemon.stop(function(code) {
                    resolve(code);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

};