import util from './Util';

var defaultSettings = {
    launchStartup: false,
    connectLaunch: false,
    saveCredentials: false,
    minToTaskbar: true,
    librarydInstalled: false,
    librarydEnabled: false,
    ipfsInstalled: false,
    ipfsEnabled: false,
    florincoindInstalled: false,
    florincoindEnabled: false
};

module.exports = {
    setInstalled: function(appdatapath) {
        var daemons = ['ipfs', 'florincoind', 'libraryd'];
        var os = util.getOS();
        var checked = 0;
        return new Promise((resolve, reject) => {
            daemons.forEach(function(entry) {
                var filename = (os === 'win') ? entry + '.exe' : entry;
                util.findfile(appdatapath, filename).then(function(found) {
                    checked++;
                    module.exports.save(entry + 'Installed', found).then(function() {
                        if (checked === daemons.length)
                            resolve();
                    });
                }).catch(reject);
            });
        });
    },
    get: function(item) {
        var haveDefault = null,
            value = localStorage.getItem('settings.' + item);

        // hack to parse the local storage type and fully
        // backward compatible
        try {
            value = JSON.parse(value);
        } catch (e) {
            if (value === 'true' || 'false') {
                value = (value === 'true') ? true : false;
            }
        }

        if (defaultSettings[item] && value === null) {
            value = defaultSettings[item];
        }

        return value;
    },
    save: function(key, value) {
        console.info('Preferences | ' + key + ' = ' + value);
        return new Promise((resolve) => {
            localStorage.setItem('settings.' + key, JSON.stringify(value));
            resolve();
        });
    }
}