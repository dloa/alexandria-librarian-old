import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import _ from 'lodash';
import request from 'request';
import Preferences from './PreferencesUtil';

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
        this._api.use(morgan('combined', {
            stream: {
                write: str => {
                    this.logs.push(str);
                    console.info('HTTPAPI:', str)
                }
            }
        }));
        this._api.use(bodyParser.urlencoded({
            extended: true
        }));
        this._api.use(bodyParser.json());

        this._api.get('/', (req, res) => res.json({
            paths: ['/api/<Daemon>/<action>/<command>/<OptionalParams>', '/web/']
        }));

        this._api.get('*', (req, res) => res.redirect('/'));

        _.each(extensions, extension => this['_' + extension]());

        //if (this.settings.httpAPI.active)
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
        console.log('Loading IPFS HttpAPI Extension');

        this._APIRouter.get('/ipfs/:action/:command?/:params?', (req, res) => {
            res.header('Access-Control-Allow-Origin', '*');

            /*
            var action = req.params.action;
            var command = req.params.command;
            var params = req.params.params ? req.params.params.split('&&') : undefined;
            var cliArray = [action, command].concat(params).filter(n => {
                return n != undefined
            });


            ipfsUtil.cli(cliArray).then(output => {
                res.json({
                    status: 'ok',
                    output: output
                });
            }).catch(err => res.json({
                status: 'error',
                error: err
            }));
*/
        });

        this.loadedExtensions.push('ipfs');
    }

}

export
default HttpAPI;