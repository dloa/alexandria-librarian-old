import alt from '../alt';
import util from '../utils/util';
import ipfsActions from '../actions/ipfsActions';
import florincoindActions from '../actions/florincoindActions';
import librarydActions from '../actions/librarydActions';



class daemonStore {
    constructor() {
        this.bindActions(ipfsActions);
        this.bindActions(florincoindActions);
        this.bindActions(librarydActions);

        this.errors = {};
        this.checkedRunning = false;


        this.ipfsEnabled = false;
        this.ipfsStats = false;

        this.florincoindEnabled = false;
        this.florincoindStats = false;

        this.librarydEnabled = false;
    }


    onLibrarydEnabled(state) {
        this.setState({
            librarydEnabled: state
        });
    }

    onIpfsStats(stats) {
        this.setState({
            ipfsStats: stats
        });
    }

    onIpfsEnabled(state) {
        this.setState({
            ipfsEnabled: state
        });
    }


    onFlorincoindEnabled(state) {
        this.setState({
            florincoindEnabled: state
        });
    }

    onFlorincoindStats(stats) {
        this.setState({
            florincoindStats: stats
        });
    }

    setInstalledAndRunning(appdatapath) {
        var daemons = ['ipfs', 'libraryd'];
        var os = util.getOS();
        var checked = 0;
        return new Promise((resolve, reject) => {
            daemons.forEach(function(entry) {
                checked++;
                var filename = (os === 'win') ? entry + '.exe' : entry;
                util.checktaskrunning(filename)
                    .then(function(running) {
                        running = running ? true : false;
                    });
            });
        });
    }

    errors({
        errors
    }) {
        this.setState({
            errors
        });
    }

}

export
default alt.createStore(daemonStore);