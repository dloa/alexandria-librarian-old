import _ from 'lodash';
import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import DaemonEngineStore from '../../stores/daemonEngineStore';
import CommonUtil from '../../utils/CommonUtil';
import {
    app, dialog
}
from 'remote';



const fileExists = filePath => {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}






export
default {
    getParms(installed) {
        return new Promise((resolve, reject) => {

            let confFile = path.join(app.getPath('appData'), 'Florincoin', 'Florincoin.conf');

            if (fileExists(confFile)) {
                let oldConf = fs.readFileSync(confFile, 'utf8').split('\n');
                console.log(oldConf);



            } else {
                dialog.showMessageBox({
                    noLink: true,
                    type: 'error',
                    title: 'Alexandria Librarian: Error!',
                    message: 'Florincoin config not detected!',
                    detail: 'Libraryd daemon requires a valid Florincoind configuration file to be present, Initialization aborted',
                    buttons: ['Dissmiss']
                });
            }

        });
    }

}