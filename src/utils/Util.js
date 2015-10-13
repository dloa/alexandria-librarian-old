import exec from 'exec';
import child_process from 'child_process';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import child from 'child';
import find from 'find';
import log from '../stores/LogStore';
import ps from 'xps';
import _ from 'lodash';
import shell from 'shell';
import rimraf from 'rimraf';


module.exports = {
    killtask: function(name) {
        return new Promise((resolve, reject) => {
            module.exports.checktaskrunning(name).then(function(task) {
                var taskon = task ? true : false;
                if (taskon)
                    ps.kill(task.pid).fork(
                        function(error) {
                            reject(error);
                        },
                        function() {
                            log.info('FORCE KILLING: ' + task.name + ' PID: ' + task.pid);
                            resolve();
                        }
                    );
                else
                    resolve();
            });
        });
    },
    checktaskrunning: function(name) {
        return new Promise((resolve, reject) => {
            ps.list().fork(
                function(error) {
                    reject(error)
                },
                function(processes) {
                    resolve(_.filter(processes, function(value) {
                        if (value.name === name) {
                            return value;
                        }
                    })[0]);
                }
            );
        });
    },
    purgeBins: function(binPath) {
        if (binPath === 'all')
            binPath = path.join(process.env.APP_DATA_PATH, 'bin');
        return new Promise((resolve, reject) => {
            rimraf(binPath, function(err) {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                resolve();
            })
        });
    },
    findfile: function(dir, file) {
        return new Promise((resolve, reject) => {
            find.file(file, dir, function(files) {
                if (files.length > 0)
                    resolve(true);
                else
                    resolve(false);
            })
        });
    },
    openUrl: function(url) {
        return shell.openExternal(url);
    },
    chmod: function(file, mode) {
        return new Promise((resolve, reject) => {
            fs.chmod(file, mode, function(err) {
                if (err)
                    return reject(err);
                resolve(true);
            });
        });
    },
    exists: function(file) {
        return new Promise((resolve) => {
            fs.stat(file, function(err, status) {
                if (err)
                    return resolve(false);
                resolve(status);
            });
        });
    },
    createDir: function(dir) {
        dir = path.normalize(dir);
        return new Promise((resolve, reject) => {
            module.exports.exists(dir).then(function(exists) {
                if (!exists)
                    mkdirp(dir, function(err) {
                        if (err)
                            reject(err);
                        else
                            resolve(true);
                    });
                else
                    resolve(true);
            })
        });
    },
    getOS: function() {
        switch (process.platform) {
            case 'win64':
            case 'win32':
                return 'win';
                break;
            case 'linux':
                return 'linux';
                break;
            case 'darwin':
                return 'osx';
                break;
            default:
                return process.platform;
        }
    },
    copyfile: function(source, target) {
        return new Promise((resolve, reject) => {
            var rd = fs.createReadStream(source);
            rd.on('error', function(err) {
                reject(err);
            });
            var wr = fs.createWriteStream(target);
            wr.on('error', function(err) {
                reject(err);
            });
            wr.on('close', function(ex) {
                resolve();
            });
            rd.pipe(wr);
        });
    },
    child: function(cmd, args, norestart) {
        log.info('Running : ' + cmd + ' --' + args);
        return child({
            // Command to execute 
            command: cmd,
            // [Optional] Command arguments (same as nodejs.org/api/child_process.html) 
            args: args,
            // [Optional] Extra Options (same as nodejs.org/api/child_process.html) 
            options: {
                detached: true
            },
            // [Optional] Auto restart? 
            autoRestart: norestart ? true : false,
            // [Optional] Timeout beetwen restart's 
            restartTimeout: 200,
            // [Optional] Callback when the process is Auto-restarted 
            cbRestart: function(data) {
                if (data) {
                    console.log('restart ' + data);
                    log.info('Restarting: ' + data);
                }
            },
            // [Optional] On Output 
            cbStdout: function(data) {
                if (data) {
                    console.log(data.toString());
                    log.info(data);
                }
            },
            // [Optional] On Error 
            cbStderr: function(data) {
                if (data) {
                    console.log('err: ' + data);
                    log.error(data);
                }
            },
            // [Optional] On Exit 
            cbClose: function(exitCode) {
                log.info('Killing : ' + cmd + ' --' + args);
                if (exitCode) {
                    console.log(exitCode.toString());
                    log.info('Terminated With Exit Code: ' + exitCode);
                }
            },
        })
    },
    exec: function(args, options) {
        options = options || {};

        // Add resources dir to exec path for Windows
        if (this.isWindows()) {
            options.env = options.env || {};
            if (!options.env.PATH) {
                options.env.PATH = process.env.BIN_PATH + ';' + process.env.PATH;
            }
        }

        let fn = Array.isArray(args) ? exec : child_process.exec;
        return new Promise((resolve, reject) => {
            fn(args, options, (stderr, stdout, code) => {
                if (code) {
                    var cmd = Array.isArray(args) ? args.join(' ') : args;
                    log.error(stderr);
                    reject(new Error(cmd + ' returned non zero exit code. Stderr: ' + stderr));
                } else {
                    log.info(stdout);
                    resolve(stdout);
                }
            });
        });
    },
    generatePassword: function(length) {
        var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    },
    isWindows: function() {
        return process.platform === ('win32' || 'win64');
    },
    supportDir: function() {
        return require('remote').require('app').getPath('userData');
    },
    packagejson: function() {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    },
    compareVersions: function(v1, v2, options) {
        var lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts = v1.split('.'),
            v2parts = v2.split('.');

        function isValidPart(x) {
            return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) {
                v1parts.push('0');
            }
            while (v2parts.length < v1parts.length) {
                v2parts.push('0');
            }
        }

        if (!lexicographical) {
            v1parts = v1parts.map(Number);
            v2parts = v2parts.map(Number);
        }

        for (var i = 0; i < v1parts.length; ++i) {
            if (v2parts.length === i) {
                return 1;
            }
            if (v1parts[i] === v2parts[i]) {
                continue;
            } else if (v1parts[i] > v2parts[i]) {
                return 1;
            } else {
                return -1;
            }
        }

        if (v1parts.length !== v2parts.length) {
            return -1;
        }

        return 0;
    },
    bytesToSize: function(bytes) {
        var thresh = 1000;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(2) + ' ' + units[u];
    },
    toHHMMSS: function(seconds) {
        var sec_num = parseInt(seconds, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    }
};