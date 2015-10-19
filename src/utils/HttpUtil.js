import Promise from 'bluebird';
import express from 'express';
import bodyParser from 'body-parser';



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

        var Daemons = ['/ipfs', '/libraryd', '/florincoin'];


        Daemons.forEach(function(name) {
            this.router.get(name + '/:action/:command', function(req, res) {
                var action = req.params.action;
                var command = req.params.command;
                console.log(action, command)
                res.json({
                    action: command
                });
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
