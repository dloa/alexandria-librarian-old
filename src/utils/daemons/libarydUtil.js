import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import fs from 'fs';
import remote from 'remote';

import Settings from '../settingsUtil';
import util from '../util';
import librarydActionHandler from '../../actions/librarydActions';
import notificationsUtil from '../notifyUtil';

var app = remote.require('app');
var AppData = app.getPath('userData');
var asarBIN = path.normalize(path.join(__dirname, '../../../', 'bin'));

module.exports = {
    download: function() {
        // To be done later.
    },
    installAndEnable: function(tmppath) {
        var os = util.getOS();
        return new Promise((resolve, reject) => {
            util.copyfile(path.join(asarBIN, os, (os === 'win') ? 'libraryd.exe' : 'libraryd'), path.join(AppData, 'bin', (os === 'win') ? 'libraryd.exe' : 'libraryd'))
                .then(function() {
                    return util.chmod(path.join(AppData, 'bin', (os === 'win') ? 'libraryd.exe' : 'libraryd'), '0777').catch(resolve);
                })
                .then(function() {
                    this.enable();
                    librarydActionHandler.librarydInstalled(true);
                }.bind(this))
                .catch(reject);
        }).bind(this);
    },
    enable: function() {
        util.exists(path.join(AppData, 'bin', (util.getOS() === 'win') ? 'libraryd.exe' : 'libraryd'))
            .then(function(found) {
                if (found) {
                    try {
                        this.daemon = util.child(path.join(AppData, 'bin', (util.getOS() === 'win') ? 'libraryd.exe' : 'libraryd'), {
                            cwd: path.join(AppData, 'bin'),
                            env: {
                                F_USER: Settings.get('Florincoind-username'),
                                F_TOKEN: Settings.get('Florincoind-password')
                            }
                        });
                        this.daemon.start(function(pid) {
                            notificationsUtil.notify({
                                title: 'ΛLΞXΛNDRIΛ Librarian',
                                message: 'Libraryd daemon started.'
                            });
                            librarydActionHandler.librarydEnabled(true);
                        });
                    } catch (e) {
                        librarydActionHandler.librarydEnabled(false);
                    }
                } else {
                    this.installAndEnable();
                }
            }.bind(this));
    },
    disable: function() {
        return new Promise((resolve, reject) => {
            if (this.daemon) {
                try {
                    this.daemon.stop(function(code) {
                        librarydActionHandler.librarydEnabled(false);
                        resolve(code);
                    });
                } catch (e) {
                    module.exports.forceKill().then(function() {
                        librarydActionHandler.librarydEnabled(false);
                        resolve();
                    }).catch(reject);
                }
            } else {
                module.exports.forceKill();
            }
        });
    },
    forceKill: function() {
        var librarydname = (os === 'win') ? 'libraryd.exe' : 'libraryd';
        return util.killtask(librarydname).then(function() {
            librarydActionHandler.librarydEnabled(false);
        });
    }
};