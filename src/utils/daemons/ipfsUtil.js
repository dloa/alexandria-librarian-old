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
    getStats: function() {

        Promise.all([this.getPeers(), this.getBW()])
            .spread(function(peers, bw) {
                var statusObj = {
                    peers: peers.split('\n').map(Function.prototype.call, String.prototype.trim).filter(Boolean),
                    stats: bw.split('\n').splice(1).map(Function.prototype.call, String.prototype.trim).filter(Boolean)
                };
                console.log(statusObj)
            })



    },
    getBW: function() {
        return new Promise((resolve, reject) => {
            this.cli(['stats', 'bw'])
                .then(function(bw) {
                    resolve(bw);
                });
        }).bind(this);
    },
    getPeers: function() {
        return new Promise((resolve, reject) => {
            this.cli(['swarm', 'peers'])
                .then(function(peers) {

                    resolve(peers);
                });
        }).bind(this);
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
        }).bind(this);
    },
    addFile: function(filepath) {
        return new Promise((resolve, reject) => {
            this.cli(['add', path.normalize(filepath)])
                .then(function(addedResponce) {
                    addedResponce = addedResponce.split(' ');
                    resolve(addedResponce[1]);
                });
        }).bind(this);
    },
    removePin: function(hash) {

    },
    installAndEnable: function(tmppath) {
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
                    this.enable();
                    ipfsActionHandler.ipfsInstalled(true);
                    resolve();
                }.bind(this))
                .catch(reject);
        }).bind(this);
    },
    checkRunning: function() {
        return new Promise((resolve, reject) => {
            if (this.daemon) {
                ipfsActionHandler.ipfsEnabled(true);
                return resolve(true)
            }
            var ipfsname = (os === 'win') ? 'ipfs.exe' : 'ipfs';
            util.checktaskrunning(ipfsname)
                .then(function(running) {
                    var taskon = running ? true : false;
                    ipfsActionHandler.ipfsEnabled(running);
                    resolve(taskon);
                }).catch(function() {
                    ipfsActionHandler.ipfsEnabled(false);
                    resolve(false)
                })
        }).bind(this);
    },
    enable: function() {
        util.exists(path.join(AppData, 'bin'), (util.getOS() === 'win') ? 'ipfs.exe' : 'ipfs')
            .then(function(found) {
                if (found) {
                    try {
                        this.daemon = util.child(path.join(AppData, 'bin', (util.getOS() === 'win') ? 'ipfs.exe' : 'ipfs'), ['daemon']);
                        this.daemon.start(function(pid) {
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
                    this.installAndEnable();
                }
            }.bind(this));
    },
    disable: function() {
        return new Promise((resolve, reject) => {
            if (this.daemon) {
                try {
                    this.daemon.stop(function(code) {
                        ipfsActionHandler.ipfsEnabled(false);
                        this.daemon = false;
                    });
                } catch (e) {
                    ipfsActionHandler.ipfsEnabled(false);
                    this.forceKill().then(resolve).catch(reject);
                }
            } else {
                ipfsActionHandler.ipfsEnabled(false);
                this.forceKill();
            }
        }).bind(this);
    },
    forceKill: function() {
        var ipfsname = (os === 'win') ? 'ipfs.exe' : 'ipfs';
        return util.killtask(ipfsname);
    }
};