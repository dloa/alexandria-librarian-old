import ls from 'local-storage';
import {
    v4 as uuid
}
from 'uuid';
import alt from '../../alt';
import PreferencesActions from './actions';


const defaultSettings = {
    httpAPI: {
        port: 8079,
        active: false
    },
    startOnLogin: true,
    florincoind: {
        user: 'default',
        pass: uuid()
    }
};



class PreferencesStore {
    constructor() {
        this.bindActions(PreferencesActions);

        this.httpAPI = {
            port: ls.isSet('httpAPI:port') ? ls.get('httpAPI:port') : this._getAndSet('httpAPI:active', defaultSettings.httpAPI.port),
            active: ls.isSet('httpAPI:active') ? ls.get('httpAPI:active') : this._getAndSet('httpAPI:active', defaultSettings.httpAPI.active),
        };

        this.startOnLogin = ls.isSet('startOnLogin') ? ls.get('startOnLogin') : this._getAndSet('startOnLogin', defaultSettings.startOnLogin);

        this.florincoind = {
            user: ls.isSet('florincoind:user') ? ls.get('florincoind:user') : this._getAndSet('florincoind:user', 'default'),
            pass: ls.isSet('florincoind:pass') ? ls.get('florincoind:pass') : this._getAndSet('florincoind:pass', uuid()),
        };

    }

    _getAndSet(parm, opts) {
        ls.set(parm, opts);
        return opts;
    }

    onSet(opts) {
        const [setting, value] = opts;

        this[setting] = value;

        return this._getAndSet(setting, value);
    }


}

export
default alt.createStore(PreferencesStore);