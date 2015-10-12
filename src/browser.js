import app from 'app';
import BrowserWindow from 'browser-window';
import ipc from 'ipc';
import fs from 'fs';
import path from 'path';
import trayTemplate from './app-tray';

process.env.NODE_PATH = path.join(__dirname, 'node_modules');
process.env.APP_DATA_PATH = path.join(app.getPath('userData'));

var settingsjson = {};
try {
    settingsjson = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json'), 'utf8'));
} catch (err) {}

var openURL = null;
app.on('open-url', function(event, url) {
    event.preventDefault();
    openURL = url;
});

app.on('ready', function() {

    var checkingQuit = false;
    var canQuit = false;
    var screen = require('screen');
    var size = screen.getPrimaryDisplay().workAreaSize;

    var windowSize = {
        width: 800,
        height: 600
    }

    var mainWindow = new BrowserWindow({
        width: windowSize.width,
        height: windowSize.height,
        'standard-window': true,
        'auto-hide-menu-bar': true,
        resizable: true,
        title: 'ΛLΞXΛNDRIΛ Librarian',
        center: true,
        frame: true,
        show: false
    });

    mainWindow.loadUrl(path.normalize('file://' + path.join(__dirname, '../index.html')));


    mainWindow.webContents.on('new-window', function(e) {
        e.preventDefault();
    });

    mainWindow.webContents.on('will-navigate', function(e, url) {
        if (url.indexOf('build/index.html#') < 0) {
            e.preventDefault();
        }
    });

    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.setTitle('ΛLΞXΛNDRIΛ Librarian');
        mainWindow.show();
        mainWindow.focus();
    });
    var helper = {
        toggleVisibility: function() {
            if (mainWindow) {
                var isVisible = mainWindow.isVisible();
                if (isVisible) {
                    if (process.platform == 'darwin') {
                        app.dock.hide();
                    }
                    mainWindow.hide();
                } else {
                    if (process.platform == 'darwin') {
                        app.dock.show();
                    }
                    mainWindow.show();
                }
            }
        },
        quit: function() {
            app.quit();
        }
    };



    trayTemplate.init();

});


app.on('window-all-closed', function() {
    app.quit();
});