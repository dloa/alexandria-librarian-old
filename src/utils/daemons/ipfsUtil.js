import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import fs from 'fs';
import remote from 'remote';
import nodeUtil from 'util';

import util from '../util';
import Settings from '../settingsUtil';
import ipfsActionHandler from '../../actions/ipfsActions';
import notificationsUtil from '../notifyUtil';


var app = remote.require('app');
var AppData = app.getPath('userData');
var os = util.getOS();
var asarBIN = path.normalize(path.join(__dirname, '../../../', 'bin'));


module.exports = {

    download: function() {
        // To be done later.
    },
    cli: function(command) {
        return new Promise((resolve, reject) => {
            console.log([path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs')].concat(command))
            util.exec([path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs')].concat(command))
                .then(resolve)
                .catch(reject);
        });
    },
    getPinned: function() {
        return new Promise((resolve) => {
            this.cli(['pin', 'ls'])
                .then(function(res) {
                    var allres = [];
                    res.split('\n').forEach(function(subres) {
                        allres.push(subres.split(' ')[0]);
                    })

                    allres = allres.filter(Boolean);
                    var returnObject = [];
                    allres.forEach(function(subres) {
                        returnObject.push({
                            hash: subres.split(' ')[0]
                        })
                    })
                    resolve(returnObject);
                });
        });
    },
    pinlocalfiles: function() {
        var dialog = remote.require('dialog');

        dialog.showOpenDialog({
            title: 'Select file',
            properties: ['openFile', 'createDirectory', 'multiSelections'],
        }, function(filenames) {
            filenames.forEach(function(filepath) {
                module.exports.addFile(filepath)
                    .then(module.exports.pinFile)
                    .then(function(pinRes) {
                        var pinEvent = {
                            hash: pinRes,
                            name: path.normalize(filepath),
                            message: pinRes
                        };
                        //do something with this later

                    });
            });
        });
        return pinEmmiter;
    },
    pinFile: function(hash) {
        return new Promise((resolve, reject) => {
            this.cli(['pin', 'add', hash, '-r'])
                .then(resolve)
                .catch(reject)
        });
    },
    addFile: function(filepath) {
        return new Promise((resolve, reject) => {
            this.cli(['add', path.normalize(filepath)])
                .then(function(addedResponce) {
                    addedResponce = addedResponce.split(' ');
                    resolve(addedResponce[1]);
                });
        });
    },
    removePin: function(hash) {

    },
    installAndEnable: function(tmppath) {
        var self = this;
        return new Promise((resolve, reject) => {
            util.copyfile(path.join(asarBIN, os, (os === 'win') ? 'ipfs.exe' : 'ipfs'), path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'))
                .then(function() {
                    return util.chmod(path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'), '0777');
                })
                .then(function() {
                    return new Promise((resolve) => {
                        util.exec([path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'), 'init']).then(resolve).catch(resolve);
                    });
                })
                .then(function() {
                    self.enable();
                    ipfsActionHandler.ipfsInstalled(true);
                    resolve();
                })
                .catch(reject);
        });
    },

    checkRunning: function() {
        var self = this;
        return new Promise((resolve, reject) => {
            if (self.daemon) {
                ipfsActionHandler.ipfsEnabled(true);
                return resolve(true)
            }
            var ipfsname = (os === 'win') ? 'ipfs.exe' : 'ipfs';
            util.checktaskrunning(ipfsname).then(function(running) {
                var taskon = running ? true : false;
                ipfsActionHandler.ipfsEnabled(running);
                resolve(taskon);
            }).catch(function() {
                ipfsActionHandler.ipfsEnabled(false);
                resolve(false)
            })
        });
    },

    enable: function() {
        var self = this;
        util.findfile(path.join(AppData, 'bin'), (util.getOS() === 'win') ? 'ipfs.exe' : 'ipfs').then(function(found) {
            if (found) {
                try {
                    self.daemon = util.child(path.join(AppData, 'bin', (util.getOS() === 'win') ? 'ipfs.exe' : 'ipfs'), ['daemon']);
                    self.daemon.start(function(pid) {
                        notificationsUtil.notify({
                            title: 'ΛLΞXΛNDRIΛ Librarian',
                            message: 'IPFS daemon started.'
                        });
                        ipfsActionHandler.ipfsEnabled(true);
                    });
                } catch (e) {
                    ipfsActionHandler.ipfsEnabled(false);
                }
            } else {
                self.installAndEnable();
            }
        });
    },
    disable: function() {

        var self = this;
        return new Promise((resolve, reject) => {
            if (self.daemon) {
                try {
                    self.daemon.stop(function(code) {
                        ipfsActionHandler.ipfsEnabled(false);
                        self.daemon = false;
                    });
                } catch (e) {
                    ipfsActionHandler.ipfsEnabled(false);
                    self.forceKill().then(resolve).catch(reject);
                }
            } else {
                ipfsActionHandler.ipfsEnabled(false);
                module.exports.forceKill();
            }
        });
    },
    forceKill: function() {
        var ipfsname = (os === 'win') ? 'ipfs.exe' : 'ipfs';
        return util.killtask(ipfsname);
    }
};
