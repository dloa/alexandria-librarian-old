require.main.paths.splice(0, 0, process.env.NODE_PATH);
import remote from 'remote';
import React from 'react';
import ipc from 'ipc';
import webUtil from './utils/WebUtil';
import util from './utils/Util';
import path from 'path';
import Router from 'react-router';
import routes from './routes';
import routerContainer from './router';
import Settings from './utils/SettingsUtil';
import HttpAPI from './utils/HttpUtil'

var app = remote.require('app');
var Menu = remote.require('menu');

// Init process
util.createDir(path.join(process.env.APP_DATA_PATH, 'bin'));
webUtil.addLiveReload();
webUtil.disableGlobalBackspace();
HttpAPI.init();

var router = Router.create({
    routes: routes
});

router.run(Handler => React.render( < Handler / > , document.body));
routerContainer.set(router);

// Default Route
util.createDir(path.join(process.env.APP_DATA_PATH, 'bin')).then(function() {
    return new Promise((resolve) => {
        Settings.setInstalledAndRunning(path.join(process.env.APP_DATA_PATH, 'bin'))
            .then(function() {
                HttpAPI.toggle(Settings.get('HTTPAPIEnabled'), Settings.get('HTTPAPIPort'))
                    .then(resolve)
                    .catch(function(e) {
                    	console.log(e);
                        Settings.save('HTTPAPIEnabled', false);
                        resolve();
                    });
            });
    });
}).then(function() {
    router.transitionTo('dashboard');
});

ipc.on('application:quitting', () => {});

// Event fires when the app receives a vpnht:// URL
ipc.on('application:open-url', opts => {
    console.log('open', opts);
});

module.exports = {
    router: router
};
