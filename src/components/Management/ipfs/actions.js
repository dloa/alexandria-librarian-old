import _ from 'lodash';
import Promise from 'bluebird';
import async from 'async';
import path from 'path';
import {
    dialog, app
}
from 'remote';
import alt from '../../../alt'
import IPFSUtil from '../../../utils/daemon/ipfs';
import CommonUtil from '../../../utils/CommonUtil';

const pinnedJson = path.join(app.getPath('userData'), 'pinned.json');


class Actions {
    constructor() {
        this.generateActions(
            'pined',
            'loadedDB'
        );
    }
    pinHash() {

    }
    pinLocal() {
        this.dispatch();

        dialog.showOpenDialog({
            title: 'Select file',
            properties: ['openFile', 'createDirectory', 'multiSelections'],
        }, filenames => {
            if (filenames) {
                let queue = async.queue((file, next) => {
                    Promise.all([IPFSUtil.addFile(file), CommonUtil.folderSize(file)])
                        .spread((hash, size) => {
                            IPFSUtil.pinHash(hash.Hash).then(res => {
                                _.defer(() => {
                                    this.actions.pined({
                                        name: path.basename(file),
                                        hash: res,
                                        size: CommonUtil.formatBytes(size.toFixed(3), 2)
                                    });
                                    process.nextTick(next);
                                });
                            })
                        })
                        .catch(err => {
                            console.error(err);
                            process.nextTick(next);
                        });
                }, 2);
                _.forEach(filenames, file => {
                    queue.push(file)
                });
            }
        });
    }

    pinURL() {
        this.dispatch();
    }

    loadLocalDB() {
        this.dispatch();

        CommonUtil.readJson(pinnedJson)
            .then(this.actions.loadedDB)
            .catch(e => {
                this.actions.loadedDB({})
            });

    }

}


export
default alt.createActions(Actions);