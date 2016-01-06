import _ from 'lodash';
import alt from '../../alt'
import Promise from 'bluebird';

class PreferencesActions {

    constructor() {
        this.generateActions(
            'set',
            'remove',
            'reset'
        );
    }


    toggleStartLogin(start) {
        this.dispatch();



    }

}


export
default alt.createActions(PreferencesActions);