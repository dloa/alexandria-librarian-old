import ls from 'local-storage';
import _ from 'lodash';
import {
    v4 as uuid
}
from 'node-uuid';
import alt from '../../alt';
import PreferencesActions from './actions';


const defaultSettings = {
    httpAPI: {
        port: 8079,
        active: false
    },
    minimizeToTray: true,
    startOnLogin: true,
    florincoind: {
        user: 'default',
        pass: uuid()
    }
};



class PreferencesStore {
    constructor() {
        this.bindActions(PreferencesActions);

        _.forEach(defaultSettings, (value, index) => {
            if (typeof value === 'object') {
                this[index] = {};
                _.forEach(value, (subValue, subValueIndex) => {
                    let parm = index + ':' + subValueIndex;
                    if (!ls.isSet(parm))
                        this[index][subValueIndex] = this._getAndSet(parm, subValue);
                    else
                        this[index][subValueIndex] = ls.get(parm);
                });
            } else {
                if (!ls.get(index))
                    this[index] = this._getAndSet(index, value);
                else
                    this[index] = ls.get(index);
            }
        });
    }

    _getAndSet(parm, opts) {
        ls.set(parm, opts);
        return opts;
    }

    onSet(opts) {

        const setting = opts.setting;
        const value = opts.value;

        this[setting] = this._getAndSet(setting, value);
    }


}

export
default alt.createStore(PreferencesStore);