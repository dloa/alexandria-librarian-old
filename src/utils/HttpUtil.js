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
                message: 'Librarian API online'
            });
        });


        this.router.use(function(req, res, next) {
            console.log('Something is happening.');
            next();
        });


        this.router.route('/ipfs/:action/:command')
            .get(function(req, res) {
                var action = req.params.action;
                var command = req.params.command;
                console.log(action, command)
            });

        this.app.use('/api', this.router);

    },
    start: function(parms) {
        var port = 2710;

        return new Promise((resolve, reject) => {

            this.app.listen(port);

        });
    }
};
