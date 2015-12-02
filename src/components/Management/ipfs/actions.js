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
                IPFSUtil.addFiles(filenames);


        });
    }
    pinURL() {

    }
}


export
default alt.createActions(Actions);