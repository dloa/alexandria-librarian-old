import Promise from 'bluebird';
import child_process from 'child_process';
import fs from 'fs';
import fsExtra from 'fs-extra';
import child from 'child';
import path from 'path';
import ps from 'xps';
import {
    app
}
from 'remote';
import DaemonActions from '../actions/daemonEngineActions';
import DaemonStore from '../stores/daemonEngineStore';

const killPID = pid => {
    return new Promise((resolve, reject) => {
        ps.kill(task.pid).fork(
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

    install(source, name, sysPath = false) {


    },

    enable(daemon) {
        DaemonActions.enabling({
            id: daemon.id,
            code: 4
        });
        let installPath = path.join(this.installDir, this.getExecName(daemon.id));
        let daemonObj = this.generate(installPath, daemon.args);
        daemonObj.start(pid => {
            DaemonActions.enabled({
                daemon: daemonObj,
                id: daemon.id,
                pid: pid
            });
        });
    },

    disable(daemon) {
        if (DaemonStore.getState().enabled[daemon].daemon)
            DaemonStore.getState().enabled[daemon].daemon.stop(DaemonActions.disabled.bind(this, daemon));

    },

    install(daemon, unzip = false) {
        return new Promise(resolve => {
            DaemonActions.enabling({
                id: daemon.id,
                code: 2
            });

            let execName = this.getExecName(daemon.id)
            let installPath = path.join(this.installDir, execName);
            let sourcePath = path.join(this.binDir, execName);

            copy(sourcePath, installPath).then(copyStatus => {
                if (!copyStatus)
                    return DaemonActions.enabling({
                        id: daemon.id,
                        code: 8,
                        error: 'Copy Failure'
                    });

                exec(installPath, daemon.args, {
                    cwd: this.installDir
                }).then(output => {
                    if (checkInstalledOkay(daemon.id, output)) {
                        DaemonActions.enabling({
                            id: daemon.id,
                            code: 3
                        });
                        resolve(true);
                    } else {
                        resolve(false);
                        DaemonActions.enabling({
                            id: daemon.id,
                            code: 8,
                            error: output
                        });
                    }
                });
            });
        });
    },
    generate(daemon, args, autoRestart = false, detached = false) {
        return child({
            command: daemon,
            args: args,
            options: {
                detached: detached
            },
            autoRestart: autoRestart,
            restartTimeout: 200,
            cbRestart: data => {
                if (data) {
                    console.log('restart', data);
                }
            },
            cbStdout: data => {
                if (data) {
                    console.log(data.toString());
                }
            },
            cbStderr: data => {
                if (data) {
                    console.error(data);
                }
            },
            cbClose: exitCode => {
                if (exitCode) {
                    console.log('exit', exitCode.toString());
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