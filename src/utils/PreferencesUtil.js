import ls from 'local-storage';
import _ from 'lodash';
import {
    v4 as uuid
}
from 'node-uuid';

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

export
default class {
    constructor() {
        this.settings = {};

        _.forEach(defaultSettings, (value, index) => {
            if (typeof value === 'object') {
                this.settings[index] = {};
                _.forEach(value, (subValue, subValueIndex) => {
                    let parm = index + ':' + subValueIndex;
                    if (!ls.isSet(parm))
                        this.settings[index][subValueIndex] = this.getAndSet(parm, subValue);
                    else
                        this.settings[index][subValueIndex] = ls.get(parm);
                });
            } else {
                if (!ls.get(index))
                    this.settings[index] = this.getAndSet(index, value);
                else
                    this.settings[index] = ls.get(index);
            }
        });
    }

    getAndSet(parm, opts) {
        ls.set(parm, opts);
        return opts;
    }
};