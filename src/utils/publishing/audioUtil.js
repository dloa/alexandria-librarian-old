import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import audioMetaData from 'audio-metadata';
import _ from 'lodash';
import events from 'events';

module.exports = {
    eventEmitter: new events.EventEmitter(),
    addFiles(files) {
        _.forEach(files, file => {
            this.evaluateFile(file.path)
                .then(info => {
                    info['path'] = path.normalize(file.path);
                    info['size'] = this.calcSize(file.size);
                    this.eventEmitter.emit('file', info);
                });
        });
    },
    evaluateFile(filePath) {
        return new Promise((resolve, reject) => {
            var file = fs.readFileSync(path.normalize(filePath))
            var meta = audioMetaData.id3v1(file);
            resolve(meta ? meta : audioMetaData.ogg(file));
        });
    },
    calcSize(bytes, decimals = 3) {
        if (bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
    }

}