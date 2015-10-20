import Promise from 'bluebird';
import express from 'express';
import bodyParser from 'body-parser';
import util from './Util';
import ipfsUtil from './ipfsUtil';

module.exports = {
    init: function() {
        this.app = express();
        this.router = express.Router();
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());


        this.router.get('/', function(req, res) {
            res.json({
                status: 'Librarian API online'
            });
        });

        var Daemons = ['ipfs', 'libraryd', 'florincoin'];

        Daemons.forEach(function(name) {
            this.router.get('/' + name + '/:action/:command?/:params?', function(req, res) {
                var action = req.params.action;
                var command = req.params.command;
                var params = req.params.params;
                switch (name) {
                    case 'ipfs':
                        var cliArray = [action, command, params].filter(function(n) {
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


        this.app.use('/api', this.router);

    },
    toggle: function(state, port) {
        if (!port)
            port = 8079;

        return new Promise((resolve, reject) => {
            if (state) {
                try {
                    this.app.listen(port, function(err) {
                        resolve();
                    });
                } catch (e) {
                    reject(e);
                }
            } else {
                try {
                    this.app.close(function(err) {
                        resolve();
                    });
                } catch (e) {
                    reject(e);
                }
            }
        });
    }
};
