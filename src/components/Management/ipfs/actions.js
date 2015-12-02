import alt from '../../../alt'
import _ from 'lodash';
import {
    dialog
}
from 'remote';
import IPFSUtil from '../../../utils/daemon/ipfs';

class Actions {
    constructor() {
        this.generateActions(
            'pin'
        );
    }
    pinHash() {

    }
    pinLocal() {
        dialog.showOpenDialog({
            title: 'Select file',
            properties: ['openFile', 'createDirectory', 'multiSelections'],
        }, filenames => {
            if (filenames)
                _.forEach(filenames, file => {
                    IPFSUtil.addFile(file)
                        .then(res => {
                            console.log(res)
                            return IPFSUtil.pinHash(res.Hash);
                        }).then(res => {
                            console.log(res);
                        })
                        .catch(err => {
                            console.error(err);
                        });
                });
        });
    }
    pinURL() {

    }
}


export
default alt.createActions(Actions);