import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import fs from 'fs';
import util from './Util';
import remote from 'remote';

let app = remote.require('app');
let AppData = path.join(app.getPath('appData'), 'Alexandria-Librarian');

module.exports = {
    download: function() {
        // To be done later.
    },
    install: function(tmppath) {
        var os = util.getOS();
        return new Promise((resolve, reject) => {
            util.createDir(path.join(AppData, 'bin/ipfs'))
                .then(function() {
                    return util.copyfile(path.join(process.cwd(), 'bin', os, (os === 'win') ? 'ipfs.exe' : 'ipfs'), path.join(AppData, 'bin/ipfs', (os === 'win') ? 'ipfs.exe' : 'ipfs'));
                })
                .then(function() {
                    return util.exec([path.join(AppData, 'bin/ipfs', (os === 'win') ? 'ipfs.exe' : 'ipfs'), 'init']);
                })
                .then(resolve)
                .catch(reject);
        });
    },
    enable: function() {
        this.daemon = util.child(path.join(AppData, 'bin/ipfs', (util.getOS() === 'win') ? 'ipfs.exe' : 'ipfs'), ['daemon']);
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