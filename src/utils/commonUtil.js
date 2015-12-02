import getFolderSize from 'get-folder-size';
import Promise from 'bluebird';

module.exports = {
    folderSize(folder) {
        return new Promise((resolve, reject) => {
            getFolderSize(folder, (err, total) => {
                if (err) return reject(err)
                resolve(total);
            })
        });
    },

    formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
    }
}