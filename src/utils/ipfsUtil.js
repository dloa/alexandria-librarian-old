import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import fs from 'fs';
import util from './Util';
import remote from 'remote';
import nodeUtil from 'util';
import Settings from '../utils/SettingsUtil';

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
                filenames.forEach(function(filepath) {
                    module.exports.pinfile(filepath);
                });

            })
        });
    },
    pinfile: function(filepath) {
        console.log(filepath)
        this.pinUp = util.child(path.join(AppData, 'bin', (util.getOS() === 'win') ? 'ipfs.exe' : 'ipfs'), ['add', nodeUtil.format('"%s"', filepath), '-w'], false);
        this.pinUp.start(function(pid) {

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
                    Settings.save('ipfsTaskPID', pid);
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
                        Settings.save('ipfsTaskPID', false);
                        resolve(code);
                    });
                } catch (e) {
                    reject(e);
                }
            }
        });
    }
};