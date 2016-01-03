import Promise from 'bluebird';
import request from 'request';
import _ from 'lodash';
import path from 'path';
import url from 'url';
import shell from 'shell';
import notifier from 'node-notifier';
import {
    version
}
from '../../package.json';
var tryedAgain = false;


const notifyUpdate = (version, url) => {
    notifier.notify({
        title: 'Librarian ' + version + ' update available',
        message: 'Click to view',
        icon: path.join(__dirname, '../../', 'images/librarian_icon.png'),
        sound: true,
        wait: true
    });

    notifier.on('click', () => shell.openExternal(url));
}

const getJson = url => {
    return new Promise((resolve, reject) => {
        request(url, {
            json: true,
            headers: {
                'User-Agent': 'Alexandria Librarian v.' + version
            }
        }, (error, response, body) => {
            if (!error && response.statusCode == 200)
                resolve(body)
            else
                reject('something went Very Wong:' + error + '\nCODE:' + response.statusCode + '\nBODY:' + JSON.stringify(body));
        });
    })
}

module.exports = {
    check(annon = false) {

        if (process.env.NODE_ENV === 'development')
            return console.info('Development mode active, not checking for updates');
        else
            console.info('Checking for updates for client v.' + version);

        getJson('https://api.github.com/repos/dloa/alexandria-librarian/releases/latest' + (annon ? '' : '?client_id=3a8100c5af732bf04980&client_secret=e3645e45ec7bf7643a6c2c207b100eeecbcf8dcf'))
            .then(json => {
                
                if (version === json.tag_name || json.prerelease)
                    return console.info('No new updates available');

                var candidate = false;

                _.forEach(json.assets, asset => {
                    let assetParsed = path.parse(asset.name).name.split('-');
                    if (_.isEqual({
                            platform: (assetParsed[2].toLowerCase() === ('windows' || 'win32')) ? 'win32' : ((assetParsed[2].toLowerCase() === ('mac' || 'osx')) ? 'darwin' : 'linux')
                        }, {
                            platform: process.platform
                        }))
                        candidate = asset;
                });

                if (candidate) {
                    console.info('New update available v.' + json.tag_name);
                    notifyUpdate(json.tag_name, json.html_url);
                }

            })
            .catch(err => {
                console.log(err);
                if (!tryedAgain) {
                    tryedAgain = true;
                    _.delay(this.check.bind(this, true), 1000)
                }
            })
    }
}