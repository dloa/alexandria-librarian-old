import log from '../stores/LogStore';
import Winreg from 'winreg';
import path from 'path';
import util from './Util';
import Promise from 'bluebird';
import fs from 'fs';

var regKey = new Winreg({
    hive: Winreg.HKCU,
    key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});
let resourceDir = path.normalize(path.join(__dirname, '../../', 'resources'))
module.exports = {
    enableStartOnBoot: function() {
        switch (util.getOS()) {
            case 'osx':
                return util.exec([
                    'osascript',
                    path.join(resourceDir, 'bin', 'osx/scripts/LoginItemAdd.scpt'),
                    'AlexandriaLibrarian'
                ]);
                break;
            case 'win':
                return new Promise((resolve) => {
                    regKey.set('AlexandriaLibrarian', Winreg.REG_SZ, "\"" + require('remote').require('app').getPath('exe') + "\"", function() {
                        resolve();
                    });
                });
                break;
            case 'linux':
                break;
        };
    },
    disableStartOnBoot: function() {
        switch (util.getOS()) {
            case 'osx':
                return util.exec([
                    'osascript',
                    path.join(resourceDir, 'bin', 'osx/scripts/LoginItemRemove.scpt'),
                    'AlexandriaLibrarian'
                ]);
                break;
            case 'win':
                return new Promise((resolve) => {
                    regKey.remove('AlexandriaLibrarian', function() {
                        resolve();
                    });
                });
                break;
            case 'linux':
                break;
        };
    },
    statusStartOnBoot: function() {
        switch (util.getOS()) {
            case 'osx':
                return util.exec([
                    'osascript',
                    path.join(resourceDir, 'bin', 'osx/scripts/LoginItemCheck.scpt')
                ]).then(function(stdout) {
                    return stdout == 1 ? true : false;
                });
                break;
            case 'win':
                return new Promise((resolve) => {
                    regKey.get('AlexandriaLibrarian', function(error, item) {
                        resolve(item != null);
                    });
                });
                break;
            case 'linux':
                break;
        };

    }
};