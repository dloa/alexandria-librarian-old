import ipc from 'ipc';
import alt from '../alt';
import ifps from '../utils/ifpsUtil';

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

  }


}

export default alt.createActions(ipfsActions);
