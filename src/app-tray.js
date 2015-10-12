import Menu from 'menu';
import MenuItem from 'menu-item';
import Tray from 'tray';
import ipc from 'ipc';
import path from 'path';

// Define a function to set up our tray icon
exports.init = function(helper) {

	// Disconnected State
	var trayMenu = new Menu();
	trayMenu.append(new MenuItem({
		label: 'Toggle ΛLΞXΛNDRIΛ Librarian',
		click: helper.toggleVisibility
	}));
	trayMenu.append(new MenuItem({
		type: 'separator'
	}));
	
	trayMenu.append(new MenuItem({
		label: 'Quit',
		click: helper.quit
	}));


	let trayImage = path.normalize(path.join(__dirname, '../', 'images/icons/tray.png'));

	var tray = new Tray(trayImage);
	tray.setContextMenu(trayMenu);

	tray.on('clicked', helper.toggleVisibility);



	

};
