import remote from 'remote';
import React from 'react';

import ipc from 'ipc';
import path from 'path';
import Router from 'react-router';
import yargs from 'yargs';

import webUtil from './js/utils/webUtil';
import util from './js/utils/util';
import Settings from './js/utils/settingsUtil';
import HttpAPI from './js/utils/httpApiUtil'
import LogStore from './js/stores/logStore'
import routerContainer from './js/router';
import routes from './js/routes';

var app = remote.require('app');
var Menu = remote.require('menu');

var AppData = path.join(app.getPath('userData'));

var args = yargs(process.argv.slice(1)).wrap(100).argv;



// Init process
LogStore.initLogs();
util.createDir(path.join(AppData, 'bin'));
webUtil.addLiveReload();
webUtil.disableGlobalBackspace();
HttpAPI.init();





// Default Route
util.createDir(path.join(AppData, 'bin'));

HttpAPI.toggle(Settings.get('HTTPAPIEnabled'), Settings.get('HTTPAPIPort'))
    .catch(function(e) {
        console.log(e);
        Settings.save('HTTPAPIEnabled', false);
    });


if (!args.hide) {
    ipc.send('application:show');
}


// Event fires when the app receives a custom protocal url
ipc.on('application:open-url', opts => {
    console.log('open', opts);
});