import util from './util';

var defaultSettings = {
    /* Startup */
    launchStartup: false,
    startMinimized: false,

    saveCredentials: false,

    /* Daemons */
    librarydInstalled: false,
    librarydEnabled: false,
    ipfsInstalled: false,
    ipfsEnabled: false,
    florincoindInstalled: false,
    florincoindEnabled: false,

    /* HTTP API */
    HTTPAPIPort: 8079,
    HTTPAPIEnabled: true
};

module.exports = {
    setInstalledAndRunning: function(appdatapath) {
        var daemons = ['ipfs', 'libraryd'];
        var os = util.getOS();
        var checked = 0;
        return new Promise((resolve, reject) => {
            daemons.forEach(function(entry) {
                checked++;
                var filename = (os === 'win') ? entry + '.exe' : entry;
                util.findfile(appdatapath, filename).then(function(found) {
                    module.exports.save(entry + 'Installed', found)
                        .then(function() {
                            util.checktaskrunning(filename)
                                .then(function(running) {
                                    running = running ? true : false;
                                    module.exports.save(entry + 'Enabled', running)
                                        .then(function() {
                                            if (checked === daemons.length) {
                                                module.exports.checkflorincoin(appdatapath)
                                                    .then(resolve);
                                            }
                                        });
                                })
                        });
                }).catch(reject);
            });
        });
    },

    checkflorincoin: function(appdatapath) {
        var Namevariants = ['florincoind', 'florincoind.exe', 'Florincoin-Qt', 'florincoind.app'];
        var checked = 0;
        return new Promise((resolve, reject) => {
            Namevariants.forEach(function(entry) {
                checked++;
                util.findfile(appdatapath, entry).then(function(found) {
                    module.exports.save('florincoindInstalled', found)
                        .then(function() {
                            util.checktaskrunning(entry)
                                .then(function(running) {
                                    running = running ? true : false;
                                    module.exports.save('florincoindEnabled', running)
                                        .then(function() {
                                            if (checked === Namevariants.length) {
                                                resolve();
                                            }
                                        });
                                })
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
    },
    reset: function() {
        return new Promise((resolve) => {
            localStorage.clear();
            resolve();
        });
    }
}