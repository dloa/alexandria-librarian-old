import express from 'express';
import morgan from 'morgan';
import Promise from 'bluebird';
import enableDestroy from 'server-destroy';
import bodyParser from 'body-parser';
import _ from 'lodash';
import request from 'request';
import Preferences from './PreferencesUtil';

import DaemonEngineStore from '../stores/daemonEngineStore';

/**
 * Base Http API for both the web interface & daemon apis
 * @param {extensions} [extensions=['ipfs']] array of extensions to be loaded
 * @extends Preferences
 */

class HttpAPI extends Preferences {
    constructor(extensions = ['ipfs']) {
        super();

        this.logs = [];
        this._api = express();
        this.loadedExtensions = [];

        this._APIRouter = express.Router();
        this._APIRouter.get('/', (req, res) => res.json({
            status: 'Librarian API online',
            'available-daemons': this.loadedExtensions
        }));

        this._api.use('/api', this._APIRouter);

        // Log all server hits to console & push to array for use in GUI console
        this._api.use(morgan('combined', {
            stream: {
                write: str => {
                    this.logs.push(str);
                    console.info('HTTPAPI:', str);
                }
            }
        }));

        this._api.use(bodyParser.urlencoded({
            extended: true
        }));
        this._api.use(bodyParser.json());

        this._api.get('/', (req, res) => res.json({
            paths: ['/api/<daemon>/<action>/<command>?<optname>=<opt>', '/web/']
        }));

        this._api.get('*', (req, res) => res.redirect('/'));


        _.each(extensions, extension => this['_' + extension]());

        if (this.settings.httpAPI.active)
            this.start();

        this.emitter.on('httpAPI:active', state => state ? this.start() : this.stop());
    }

    /**
     */
    add(extension) {
        if (!extension)
            return 'no extension provided';

    }

    /**
     */
    remove(extension) {
        if (!extension)
            return 'no extension provided';

    }

    /**
     * Starts HTTP API server
     * @param {boolean} [force=false] - Force close any exsisting HTTP API instances
     * @type {Function}
     */
    start(force) {
        if (force && this._server)
            this.stop();

        this._server = this._api.listen(this.settings.httpAPI.port, () => console.info('HTTPAPI listening at http://localhost:%s', this._server.address().port));
        enableDestroy(this._server);
    }

    /**
     * Stops HTTP API server
     * @type {Function}
     */
    stop() {
        console.info('Killing HTTPAPI at %s', this._server.address().port);
        this._server.destroy();
    }

    /**
     * Loads Http IPFS API extension
     * @type {Function}
     * @description Serves as an http abstraction layer for https://github.com/ipfs/js-ipfs-api
     * @private
     */
    _ipfs() {
        console.log('Loading IPFS HTTPAPI Extension');

        this._APIRouter.get('/ipfs/:action/:subAction?', (req, res) => {
            res.header('Access-Control-Allow-Origin', '*');

            const action = _.unescape(req.params.action);
            const subAction = (req.params.subAction !== undefined) ? _.unescape(req.params.subAction) : false;

            let argsArray = [];

            if (action === 'send') {
                argsArray = [_.unescape(subAction), (req.query.key ? _.unescape(req.query.key) : null), (req.query.opts ? JSON.parse(_.unescape(req.query.opts)) : {})];
                DaemonEngineStore.getState().enabled.ipfs.api.send(...argsArray, null, (err, data) => res.json({
                    status: err ? 'error' : 'ok',
                    output: err ? err : data[0]
                }));
            } else {
                _.each(req.query, query => argsArray.push(_.unescape(query)));

                argsArray.push((err, data) => res.json({
                    status: (err ? 'error' : 'ok'),
                    output: (err ? err : data[0])
                }));
                if (!subAction)
                    DaemonEngineStore.getState().enabled.ipfs.api[action](...argsArray);
                else
                    DaemonEngineStore.getState().enabled.ipfs.api[action][subAction](...argsArray);
            }
        });

        this.loadedExtensions.push('ipfs');
    }

}

export
default HttpAPI;