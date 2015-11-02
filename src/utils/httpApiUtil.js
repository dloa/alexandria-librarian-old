import Promise from 'bluebird';
import express from 'express';
import bodyParser from 'body-parser';

import util from './util';
import ipfsUtil from './daemons/ipfsUtil';
import LogStore from '../stores/logStore';

module.exports = {
    init: function() {
        this.app = express();
        this.router = express.Router();
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());

        this.api();


        this.app.get('/', function(req, res) { //base path
            res.json({
                paths: ['/api/<Daemon>/<action>/<command>/<OptionalParams>', '/web/']
            });
        });

        this.app.get('*', function(req, res) { // 404 redirect
            res.redirect('/');
        });

    },

    api: function() {

        this.app.use('/api', this.router);



        var Daemons = ['ipfs', 'libraryd', 'florincoin'];

        Daemons.forEach(function(name) {
            this.router.get('/' + name + '/:action/:command?/:params?', function(req, res) {
                res.header('Access-Control-Allow-Origin', '*');
                var action = req.params.action;
                var command = req.params.command;
                var params = req.params.params ? req.params.params.split('&&') : undefined;
                switch (name) {
                    case 'ipfs':
                        var cliArray = [action, command].concat(params).filter(function(n) {
                            return n != undefined
                        });
                        ipfsUtil.cli(cliArray).then(function(output) {
                            res.json({
                                status: 'ok',
                                output: output
                            });
                        }).catch(function(err) {
                            res.json({
                                status: 'error',
                                error: err
                            });
                        });
                        break;
                    case 'libraryd':
                        break;
                    default:

                }

            });
        }.bind(this));

        this.router.get('/', function(req, res) {
            res.json({
                status: 'Librarian API online',
                'availabled-daemons': Daemons
            });
        });


    },


    toggle: function(state, port) {
        if (!port)
            port = 8079;

        return new Promise((resolve, reject) => {
            if (state) {
                try {
                    this.httpapi = this.app.listen(port, function() {
                        resolve(LogStore.info('HTTP API Started at port: ' + port));
                    });
                } catch (e) {
                    LogStore.error('HTTP API startup error: ' + e)
                    reject(e);
                }
            } else {
                if (this.httpapi) {
                    try {
                        this.httpapi.close(function() {
                            resolve(LogStore.info('HTTP API Shutdown'));
                            this.httpapi = false;
                        });
                    } catch (e) {
                        LogStore.error('HTTP API shutdown error: ' + e)
                        reject(e);
                    }
                } else
                    resolve();
            }
        });
    }
};
