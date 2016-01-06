import ls from 'local-storage';
import {
    v4 as uuid
}
from 'uuid';
import alt from '../../alt';
import PreferencesActions from './actions';


class PreferencesStore {
    constructor() {
        this.bindActions(PreferencesActions);

        this.httpAPI = {
            port: ls.isSet('httpAPI:port') ? ls.get('httpAPI:port') : 8079,
            active: ls.isSet('httpAPI:active') ? ls.get('httpAPI:active') : false,
        };

        this.startOnLogin = ls.isSet('startOnLogin') ? ls.get('startOnLogin') : false;

        this.florincoind = {
            user: ls.isSet('florincoind:user') ? ls.get('florincoind:user') : this._getAndSet('florincoind:user', 'default'),
            pass: ls.isSet('florincoind:pass') ? ls.get('florincoind:pass') : this._getAndSet('florincoind:pass', uuid()),
        };





    }

    _getAndSet(parm, opts) {
        ls.set(parm, opts);
        return opts;
    }


}

export
default alt.createStore(PreferencesStore);