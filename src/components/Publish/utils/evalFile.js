import Promise from 'bluebird';
import path from 'path';
import {
    exec
}
from 'child_process';


module.exports = {
    audio(file) {
        this.mediainfo(file).then();
    },

    mediainfo(file) {
        return new Promise((resolve, reject) => {
            exec(path.join(process.cwd(), 'resources/bin', 'mediaInfo.exe') + ' --Inform="Audio;::%Duration%::%Format%::%BitRate%"', (error, stdout, stderr) => {
                if (error !== null || stderr !== '') {
                    reject('MediaInfo exec error:', (error || stderr));
                } else {
                    resolve(stdout.replace('::', '').replace('\n', '').split('::'));
                }
            });
        });
    }

}