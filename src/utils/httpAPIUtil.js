import express from 'express';
import _ from 'lodash';
import request from 'request';
import daemonEngineStore from '../../stores/daemonEngineStore';

class HttpAPI {
    constructor(extensions = {}) {
        this.logs = [];
        this._api = express();
        this._server = this._api.listen(8079, () => console.info('HTTPAPI listening at http://%s:%s', this._server.address().address, this._server.address().port));
        _.each(extensions, extension => this['_' + extension]());


    }

    add(extension) {

    }

    remove(extension) {



    }

    _ipfs() {
        console.log('startinig IPFS http api')

    }

}

export
default HttpAPI;