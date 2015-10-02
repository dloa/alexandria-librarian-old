import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import fs from 'fs';
import util from './Util';
import remote from 'remote';
import nodeUtil from 'util';
import Settings from '../utils/SettingsUtil';
import {
    EventEmitter
}
from 'events';

let dialog = remote.require('dialog');
let AppData = process.env.APP_DATA_PATH;
let os = util.getOS();

let pinEmmiter = new EventEmitter();

module.exports = {
    download: function() {
        // To be done later.
    },

    getPinned: function() {
        return new Promise((resolve) => {
            util.exec([path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'), 'pin', 'ls'])
                .then(function(res) {
                  console.log(res);
                   
                });
        });
    },
    pinfiles: function(filepath) {
        let pinEmmiter = new EventEmitter();
        dialog.showOpenDialog({
            title: 'Select file',
            properties: ['openFile', 'createDirectory', 'multiSelections'],
        }, function(filenames) {
            filenames.forEach(function(filename) {
                util.exec([path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'), 'add', path.normalize(filename)])
                    .then(function(res) {
                        res = res.split(' ');
                        module.exports.pinFile(res[1]).then(function(pinRes) {
                            pinEmmiter.emit('pinned', {
                                hash: res[1],
                                name: filename,
                                message: pinRes
                            });
                        });
                    });
            });
        });
        return pinEmmiter;
    },
    pinFile: function(hash) {
        return new Promise((resolve, reject) => {
            util.exec([path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'), 'pin', 'add', hash]).then(function(res) {
                resolve(res);
            })
        });
    },

    removePin: function(hash) {

    },
    install: function(tmppath) {
        return new Promise((resolve, reject) => {
            util.copyfile(path.join(process.cwd(), 'bin', os, (os === 'win') ? 'ipfs.exe' : 'ipfs'), path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'))
                .then(function() {
                    return util.chmod(path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'), '0777');
                })
                .then(function() {
                    return util.exec([path.join(AppData, 'bin', (os === 'win') ? 'ipfs.exe' : 'ipfs'), 'init']);
                })
                .then(resolve)
                .catch(reject);
        });
    },
    enable: function() {
        this.daemon = util.child(path.join(AppData, 'bin', (util.getOS() === 'win') ? 'ipfs.exe' : 'ipfs'), ['daemon']);
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
            if (this.daemon) {
                try {
                    this.daemon.stop(function(code) {
                        resolve(code);
                    });
                } catch (e) {
                    module.exports.forceKill().then(resolve).catch(reject);
                }
            } else {
                module.exports.forceKill();
            }
        });
    },
    forceKill: function() {
        var ipfsname = (os === 'win') ? 'ipfs.exe' : 'ipfs';
        return util.killtask(ipfsname);
    }
};