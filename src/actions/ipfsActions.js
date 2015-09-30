import ipc from 'ipc';
import alt from '../alt';
import ifps from '../utils/ipfsUtil';

class ipfsActions {

  download () {

    this.dispatch();
    ifps.download()
        .then((DLpath) => {
            console.info('download saved to', DLpath);
        })
        .catch((error) => {
            console.error('Unable to download', error);
        });
  }

  install () {
    this.dispatch();
    ifps.install().then(() => {
          console.log('IPFS installed')
    })
  }


}

export default alt.createActions(ipfsActions);
