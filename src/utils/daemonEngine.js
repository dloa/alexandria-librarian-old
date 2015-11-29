import Promise from 'bluebird';
import child from 'child';
import path from 'path';
import ps from 'xps';
import {
    app
}
from 'remote';

killPID = pid => {
    return new Promise((resolve, reject) => {
        ps.kill(task.pid).fork(
            error => {
                resolve(error);
            }, () => {
                resolve(true);
            }
        );
    });
}

module.exports = {

    binDir: path.join(process.cwd(), 'resources/bin'),
    installDir: path.join(app.getPath('userData'), 'bin'),

    install(source, name, sysPath = false) {


    },

    generate(daemon, args, autoRestart = false, detached = true) {
        return {
            daemon: child({
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
            })
        };
    },

    checkInstalled(daemon) {
        let daemonPath = path.join(installDir, this.getExecName(daemon))

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