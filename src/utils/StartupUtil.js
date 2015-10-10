import log from '../stores/LogStore';
import Winreg from 'winreg';
import path from 'path';

var regKey = new Winreg({
    hive: Winreg.HKCU,
    key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});

module.exports = {
    enableStartOnBoot: function(hidden) {
        return new Promise((resolve) => {
            regKey.set('AlexandriaLibrarian', Winreg.REG_SZ, "\"" + require('remote').require('app').getPath('exe') + "\"", function() {
                resolve();
            });
        });
    },

    disableStartOnBoot: function() {
        return new Promise((resolve) => {
            regKey.remove('AlexandriaLibrarian', function() {
                resolve();
            });
        });
    },

    statusStartOnBoot: function() {
        return new Promise((resolve) => {
            regKey.get('AlexandriaLibrarian', function(error, item) {
                resolve(item != null);
            });
        });
    },
};