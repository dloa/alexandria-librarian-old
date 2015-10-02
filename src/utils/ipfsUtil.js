import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import fs from 'fs';
import util from './Util';
import remote from 'remote';
import nodeUtil from 'util';
import Settings from '../utils/SettingsUtil';
import ipfsApi from 'ipfs-api';



let ipfsInstance = null;
let dialog = remote.require('dialog');
let AppData = process.env.APP_DATA_PATH;
let os = util.getOS();

module.exports = {
    download: function() {
        // To be done later.
    },
    getPinned: function() {
        return new Promise((resolve, reject) => {

        });
    },
    pinfiles: function(filepath) {
        return new Promise((resolve, reject) => {
            var args = {
                title: 'Select file',
                properties: ['openFile', 'createDirectory', 'multiSelections'],
            };
            dialog.showOpenDialog(args, function(filenames) {
                console.log(filenames);

                ipfsInstance.add(filenames, function(err, res) {
                    if (err || !res) return console.error(err)

                    res.forEach(function(file) {
                        console.log(file.Hash)
                        console.log(file.Name)
                    })
                })

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
                    ipfsInstance = ipfsApi('localhost', '5001');
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