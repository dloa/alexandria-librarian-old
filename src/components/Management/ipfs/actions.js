import alt from '../../../alt'
import _ from 'lodash';
import {
    dialog
}
from 'remote';

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
            console.log(filenames)
        });
    }
    pinURL() {

    }
}


export
default alt.createActions(Actions);