import Menu from 'menu';
import MenuItem from 'menu-item';
import Tray from 'tray';
import ipc from 'ipc';
import path from 'path';
import util from './utils/Util';

// Define a function to set up our tray icon
exports.init = function(helper) {

    // Disconnected State
    var trayMenu = new Menu();
    trayMenu.append(new MenuItem({
        label: 'Show/Hide Settings Window',
        click: helper.toggleVisibility
    }));
    trayMenu.append(new MenuItem({
        type: 'separator'
    }));

    trayMenu.append(new MenuItem({
        label: 'Quit',
        click: helper.quit
    }));

    var tray = new Tray(path.normalize(path.join(__dirname, '../', 'images/icons/tray/tray_' + util.getOS() + '.png')));
    tray.setContextMenu(trayMenu);

    tray.on('clicked', helper.toggleVisibility);

};