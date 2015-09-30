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
                .then(resolve)
                .catch(reject);
        });
    },
    run: function(path) {
        return util.exec([path.join(process.cwd(), '/bin/win/ipfs.exe'), 'daemon'])
    }

};