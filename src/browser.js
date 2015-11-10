import app from 'app';
import BrowserWindow from 'browser-window';
import ipc from 'ipc';
import path from 'path';
import trayTemplate from './app-tray';
import util from './utils/util';
import yargs from 'yargs';


var args = yargs(process.argv.slice(1)).wrap(100).argv;


process.env.NODE_PATH = path.join(__dirname, 'node_modules');

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
    
    mainWindow.openDevTools();

    if (args.dev) {
        mainWindow.show();
        mainWindow.toggleDevTools();
        mainWindow.focus();
        console.info('Dev Mode Active: Developer Tools Enabled.')
    }

    mainWindow.setMenu(null);

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
    });

    ipc.on('application:show', () => {
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
            canQuit = true;
            util.killAllDaemons()
                .then(app.quit)
                .catch(app.quit);
        }
    };

    mainWindow.on('close', function(event) {
        if (!canQuit) {
            helper.toggleVisibility();
            return event.preventDefault();
        } else
            app.quit();
    });

    trayTemplate.init(helper);

});


app.on('window-all-closed', function() {
    app.quit();
});