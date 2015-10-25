import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import remote from 'remote';
import nodeUtil from 'util';
import fs from 'fs';
import readline from 'readline';
import DecompressZip from 'decompress-zip';


import util from '../util';
import Settings from '../settingsUtil';
import florincoindActionHandler from '../../actions/florincoindActions';

var app = remote.require('app');
var AppData = app.getPath('userData');
var asarBIN = path.normalize(path.join(__dirname, '../../../', 'bin'));
var os = util.getOS();

module.exports = {
    download: function() {
        // To be done later.
    },
    install: function(tmppath) {
        var os = util.getOS();
        return new Promise((resolve, reject) => {
            if (os === 'osx') {
                var files = [];
                new DecompressZip(path.join(asarBIN, os, 'florincoind.zip'))
                    .on('error', function(err) {
                        reject(err);
                    })
                    .on('extract', function(log) {
                        // Setup chmodSync to fix permissions

                        files.forEach(function(file) {
                            fs.chmodSync(path.join(AppData, 'bin', file.path), file.mode);
                        });

                        florincoindActionHandler.florincoindInstalled(true);
                        resolve();
                    })
                    .extract({
                        path: path.join(AppData, 'bin'),
                        filter: function(entry) {
                            files.push({
                                path: entry.path,
                                mode: entry.mode.toString(8)
                            });
                            return true;
                        }
                    });
            } else {
                var filename = (os === 'win') ? 'florincoind.exe' : 'florincoind';
                util.copyfile(path.join(process.cwd(), 'bin', os, filename), path.join(AppData, 'bin', filename))
                    .then(function() {
                        florincoindActionHandler.florincoindInstalled(true);
                        resolve();
                    })
                    .catch(function() {
                        florincoindActionHandler.florincoindInstalled(true);
                        resolve();
                    });
            }
        });
    },
    checkConf: function() {
        var dialog = remote.require('dialog');

        return new Promise((resolve, reject) => {
            util.exists(path.join(app.getPath('appData'), 'Florincoin', 'Florincoin.conf'))
                .then(function(exists) {
                    if (!exists)
                        var needsConf = true
                    else
                        var Confexsist = true;
                    if (!Settings.get('Florincoind-username') || !Settings.get('Florincoind-password'))
                        var needsConf = true;
                    if ((Settings.get('Florincoind-username') && Settings.get('Florincoind-password')) && !Confexsist)
                        var justsave = true;
                    if (Confexsist && needsConf)
                        var importConf = true;
                    console.log(needsConf, justsave, path.join(app.getPath('appData'), 'Florincoin', 'Florincoin.conf'))
                    if (needsConf || importConf) {
                        var FlorincoinTmp = path.join(app.getPath('appData'), 'Florincoin');
                        var FlorincoinConf = path.join(FlorincoinTmp, 'florincoin.conf');
                        if (!importConf) {
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
                                        fs.writeFile(FlorincoinConf, config.join('\n'), function(err) {
                                            if (err)
                                                return reject(err);
                                            resolve('Config saved sucsessfuly');
                                        });
                                    });
                                })
                                .then(resolve)
                                .catch(reject);
                        } else {
                            var userfound = false;
                            var userpassfound = false;
                            readline.createInterface({
                                input: fs.createReadStream(FlorincoinConf)
                            }).on('line', function(line) {
                                line = line.split('=');
                                if (line[0] === 'rpcuser') {
                                    userfound = true;
                                    Settings.save('Florincoind-username', line[1]);
                                }
                                if (line[0] === 'rpcpassword') {
                                    userpassfound = true;
                                    Settings.save('Florincoind-password', line[1]);
                                }
                            }).on('close', function() {
                                if (userpassfound && userfound)
                                    resolve()
                                else
                                    reject()
                            });
                        }
                    } else
                        resolve();
                })
        });
    },
    enable: function() {
        var os = util.getOS();
        var self = this;
        return new Promise((resolve, reject) => {
            module.exports.checkConf().then(function() {
                if (os === 'osx') {
                    util.exec(['open', path.join(AppData, 'bin', 'florincoind.app')])
                        .then(function() {
                            florincoindActionHandler.florincoindEnabled(true);
                            resolve();
                        })
                        .catch(reject);
                } else {
                    var filename = (os === 'win') ? 'florincoind.exe' : 'florincoind';
                    self.daemon = util.child(path.join(AppData, 'bin', filename), []);
                    try {
                        self.daemon.start(function(pid) {
                            florincoindActionHandler.florincoindEnabled(true);
                            resolve(pid);
                        });
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        });
    },
    disable: function() {
        return new Promise((resolve, reject) => {
            if (this.daemon) {
                try {
                    this.daemon.stop(function(code) {
                        florincoindActionHandler.florincoindEnabled(false);
                        resolve(code);
                    });
                } catch (e) {
                    module.exports.forceKill().then(function() {
                        florincoindActionHandler.florincoindEnabled(false);
                        resolve();
                    }).catch(reject);
                }
            } else {
                module.exports.forceKill();
            }
        });
    },
    forceKill: function() {
        var florincoindname = (os === 'win') ? 'florincoind.exe' : 'florincoind';
        if (os === 'osx')
            florincoindname = 'Florincoin-Qt';
        return util.killtask(florincoindname).then(function() {
            florincoindActionHandler.florincoindEnabled(false);
        });
    }

};