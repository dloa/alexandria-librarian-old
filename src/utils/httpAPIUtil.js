import express from 'express';
import morgan from 'morgan';
import _ from 'lodash';
import request from 'request';
import Preferences from './PreferencesUtil';

class HttpAPI extends Preferences {
    constructor(extensions = ['ipfs']) {
        super();

        this.logs = [];

        this._api = express();
        this._api.use(morgan('combined', {
            stream: {
                write: str => {
                    this.logs.push(str);
                    console.info('HTTPAPI:', str)
                }
            }
        }));


        _.each(extensions, extension => this['_' + extension]());

        if (this.settings.httpAPI.active)
            this.start();
    }

    add(extension) {

    }

    remove(extension) {



    }

    start() {
        if (this._server)
            this.stop();
        
        this._server = this._api.listen(this.settings.httpAPI.port, () => console.info('HTTPAPI listening at http://%s:%s', this._server.address().address, this._server.address().port));
    }


    stop() {
        this._server.close();
    }

    _ipfs() {
        console.log('starting IPFS http api')

    }

}

export
default HttpAPI;