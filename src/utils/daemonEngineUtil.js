import Promise from 'bluebird';
import child_process from 'child_process';
import fs from 'fs';
import fsExtra from 'fs-extra';
import child from 'child';
import path from 'path';
import ps from 'xps';
import ipfsAPI from 'ipfs-api';
import _ from 'lodash';
import {
    app
}
from 'remote';
import DaemonActions from '../actions/daemonEngineActions';
import DaemonStore from '../stores/daemonEngineStore';

const killPID = pid => {
    return new Promise((resolve, reject) => {
        ps.kill(pid).fork(
            error => {
                reject(error);
            }, () => {
                resolve(true);
            }
        );
    });
}

const copy = (input, output) => {
    return new Promise((resolve, reject) => {
        fsExtra.copy(input, output, err => {
            resolve(err ? false : true);
        })
    });
}

const exec = (execPath, args = [], options = {}) => {
    return new Promise((resolve, reject) => {
        child_process.exec(execPath + ' ' + args.join(' '), options, (error, stdout, stderr) => {
            resolve(error ? stderr : stdout);
        });
    });
}

const generateAPI = daemon => {

    switch (daemon) {
        case 'ipfs':
            return ipfsAPI('/ip4/127.0.0.1/tcp/5001');
            break;
        case 'florincoind':
            return false;
            break;
        case 'libraryd':
            return false;
            break;
    }
}


const checkStartedOkay = (daemon, out) => {
    switch (daemon) {
        case 'ipfs':
            var okay = ['Daemon is ready'];
            break;
        case 'florincoind':
            break;
        case 'libraryd':
            break;
    }
    return new RegExp(okay.join('|')).test(out);
}

const checkStartedFail = (daemon, out) => {
    switch (daemon) {
        case 'ipfs':
            var fail = ['no ipfs repo found', 'repo.lock": has non-zero size'];
            break;
        case 'florincoind':
            break;
        case 'libraryd':
            break;
    }
    return new RegExp(fail.join('|')).test(out);
}


const checkInstalledOkay = (daemon, out) => {
    switch (daemon) {
        case 'ipfs':
            var okay = ['ipfs configuration file already exists'];
            break;
        case 'florincoind':
            break;
        case 'libraryd':
            break;
    }
    return new RegExp(okay.join('|')).test(out);
}


module.exports = {

    binDir: path.join(process.cwd(), 'resources/bin'),
    installDir: path.join(app.getPath('userData'), 'bin'),

    enable(daemon) {
        DaemonActions.enabling({
            id: daemon.id,
            code: 4
        });
        let installPath = path.join(this.installDir, this.getExecName(daemon.id));
        let daemonObj = this.generate({
            exec: installPath,
            id: daemon.id
        }, daemon.args);
        try {
            daemonObj.start(pid => {
                DaemonActions.enabled({
                    daemon: daemonObj,
                    id: daemon.id,
                    pid: pid
                });
            });
        } catch (e) {
            console.error(e);
            DaemonActions.enabling({
                id: daemon.id,
                code: 8,
                error: 'Initialization Error'
            });
        }

    },

    disable(daemon) {
        if (DaemonStore.getState().enabled[daemon].daemon)
            DaemonStore.getState().enabled[daemon].daemon.stop(DaemonActions.disabled.bind(this, daemon));

    },

    install(daemon, unzip = false) {
        return new Promise((resolve, reject) => {
            DaemonActions.enabling({
                id: daemon.id,
                code: 2
            });

            let execName = this.getExecName(daemon.id)
            let installPath = path.join(this.installDir, execName);
            let sourcePath = path.join(this.binDir, execName);
            try {
                copy(sourcePath, installPath)
                    .then(copyStatus => {
                        return new Promise((resolve, reject) => {
                            if (!copyStatus) {
                                DaemonActions.enabling({
                                    id: daemon.id,
                                    code: 8,
                                    error: 'Installation Error'
                                });
                                return reject()
                            }
                            resolve();
                        });
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            fs.chmod(installPath, '755', err => {
                                if (err)
                                    return reject();
                                _.delay(resolve, 500);
                            });
                        });
                    })
                    .then(() => {
                        exec(installPath, daemon.args, {
                            cwd: this.installDir
                        }).then(output => {
                            if (checkInstalledOkay(daemon.id, output)) {
                                DaemonActions.enabling({
                                    id: daemon.id,
                                    code: 3
                                });
                                resolve();
                            } else {
                                DaemonActions.enabling({
                                    id: daemon.id,
                                    code: 8,
                                    error: 'Installation Error'
                                });
                                reject();
                            }
                        });
                    });
            } catch (e) {
                DaemonActions.enabling({
                    id: daemon.id,
                    code: 8,
                    error: 'Installation Error'
                });
                reject();
            }
        });
    },
    generate(daemon, args, autoRestart = false, detached = false) {
        return child({
            command: daemon.exec,
            args: args,
            options: {
                detached: detached
            },
            autoRestart: autoRestart,
            restartTimeout: 200,
            cbRestart: data => {
                if (data)
                    console.log(daemon.id + ':', 'restarting with PID:', data.toString());
            },
            cbStdout: data => {
                if (data) {
                    console.log(daemon.id + ':', data.toString());

                    if (checkStartedOkay(daemon.id, data.toString())) {
                        DaemonActions.enabling({
                            id: daemon.id,
                            code: 7
                        });
                        let api = generateAPI(daemon.id);
                        if (api)
                            DaemonActions.update({
                                id: daemon.id,
                                key: 'api',
                                api: api
                            });
                    }
                }
            },
            cbStderr: data => {
                if (data) {
                    console.error(daemon.id + ':', data.toString());

                    if (checkStartedFail(daemon.id, data.toString())) {
                        DaemonActions.enabling({
                            id: daemon.id,
                            code: 8,
                            error: 'Initialization Error'
                        });
                    }
                }
            },
            cbClose: exitCode => {
                if (exitCode) {
                    console.log(daemon.id + ':', 'exiting with code:', exitCode.toString());
                }
            },
        });
    },


    checkInstalled(daemon) {

        DaemonActions.enabling({
            id: daemon,
            code: 1
        });

        let daemonPath = path.join(this.installDir, this.getExecName(daemon))

        return new Promise((resolve) => {
            fs.stat(daemonPath, (err, status) => {
                if (err) return resolve(false);
                resolve(status);
            });
        });
    },

    shutdown(daemon) {
        return new Promise((resolve, reject) => {
            if (daemon.daemon)
                daemon.daemon.stop(resolve);
            else
                return killPID(daemon.pid)
        });
    },

    checkRunning(daemon) {
        return new Promise((resolve, reject) => {
            ps.list().fork(
                error => {
                    reject(error);
                },
                list => {
                    resolve(_.filter(list, value => {
                        if (value.name === daemon) return value;
                    })[0]);
                }
            );
        });
    },

    getExecName(daemon) {
        switch (daemon) {
            case 'ipfs':
                return (process.platform === 'win32') ? 'ipfs.exe' : 'ipfs';
                break;
            case 'florincoind':

                break;
            case 'libraryd':

                break;

        }
    }
}