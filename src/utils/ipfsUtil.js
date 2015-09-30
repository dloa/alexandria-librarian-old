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
    download: function() {},
    install: function(tmppath) {
        return new Promise((resolve, reject) => {
            util.createDir(path.join(AppData, 'bin/ipfs'))
                .then(function() {
                    return util.copyfile(path.join(process.cwd(), 'bin/win', 'ipfs.exe'), path.join(AppData, 'bin/ipfs', 'ipfs.exe'));
                })
                .then(resolve)
                .catch(reject);
        });
    },
    run: function(path) {
        return util.exec([path.join(process.cwd(), '/bin/win/ipfs.exe'), 'daemon'])
    }

};