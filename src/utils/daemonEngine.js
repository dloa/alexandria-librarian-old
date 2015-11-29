import Promise from 'bluebird';
import child from 'child';
import path from 'path';
import ps from 'xps';
import {
    app
}
from 'remote';


module.exports = {

    binDir: path.join(process.cwd(), 'resources/bin'),
    installDir: path.join(app.getPath('userData'), 'bin'),

    install(source, name) {


    },

    generate(daemon, args, autoRestart = false) {
        return {
            daemon: child({
                command: daemon,
                args: args,
                options: {
                    detached: true
                },
                autoRestart: autoRestart,
                restartTimeout: 200,
                cbRestart: data => {
                    if (data) {
                        console.log('restart ' + data);
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
                        console.log(exitCode.toString());
                    }
                },
            })
        };
    },

    checkInstalled(daemonPath) {

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