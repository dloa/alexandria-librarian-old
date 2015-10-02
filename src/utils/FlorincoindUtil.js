import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import util from './Util';
import remote from 'remote';
import Settings from '../utils/SettingsUtil';
import nodeUtil from 'util';
import fs from 'fs';

let dialog = remote.require('dialog');
let app = remote.require('app');
let AppData = process.env.APP_DATA_PATH;

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
    checkConf: function() {
        return new Promise((resolve, reject) => {
            util.exists(path.join(app.getPath('appData'), 'Florincoin', 'Florincoin.conf'))
                .then(function(exists) {
                    console.log(exists);
                    if (!exists)
                        var needsConf = true
                    if (!Settings.get('Florincoind-username') || !Settings.get('Florincoind-password'))
                        var needsConf = true;
                    else
                        var justsave = true;
                    console.log(needsConf, justsave, path.join(app.getPath('appData'), 'Florincoin', 'Florincoin.conf'))
                    if (needsConf) {
                        var AutoGenPass = util.generatePassword(125);
                        console.log(AutoGenPass);
                        Settings.save('Florincoind-username', 'admin');
                        Settings.save('Florincoind-password', AutoGenPass);
                        var FlorincoinTmp = path.join(app.getPath('appData'), 'Florincoin');
                        if (!justsave) {
                            dialog.showMessageBox({
                                title: 'Alexandria-Librarian: Information',
                                message: 'No RPC username/password found for Florincoin Wallet',
                                detail: 'Username & password will be auto generated. See preferences for more info.',
                                buttons: ['OK']
                            });
                        }
                        util.createDir(FlorincoinTmp)
                            .then(function() {
                                var config = [
                                    'rpcserver=1',
                                    'rpcallowip=192.168.0.*',
                                    'rpcallowip=127.0.0.1',
                                    'rpcport=7313',
                                    'daemon=1',
                                    'server=1',
                                    'listen=1',
                                    'port=7312',
                                    'noirc=0',
                                    'maxconnections=30',
                                    'addnode=146.185.148.114',
                                    'addnode=192.241.171.45',
                                    nodeUtil.format('rpcuser=%s', Settings.get('Florincoind-username')),
                                    nodeUtil.format('rpcpassword=%s', AutoGenPass)
                                ];
                                return new Promise((resolve, reject) => {
                                    fs.writeFile(path.join(FlorincoinTmp, 'florincoin.conf'), config.join('\n'), function(err) {
                                        if (err)
                                            return reject(err);
                                        resolve('Config saved sucsessfuly');
                                    });
                                });
                            })
                            .then(resolve)
                            .catch(reject);
                    } else
                        resolve();
                })
        });
    },
    enable: function() {
        var self = this;
        return new Promise((resolve, reject) => {
            module.exports.checkConf().then(function() {
                self.daemon = util.child(path.join(AppData, 'bin', (util.getOS() === 'win') ? 'florincoind.exe' : 'florincoind'), ['daemon']);
                try {
                    self.daemon.start(function(pid) {
                        resolve(pid);
                    });
                } catch (e) {
                    reject(e);
                }
            });
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