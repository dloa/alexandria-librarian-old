import ReactDOM from 'react-dom';
import Router from 'react-router';
import yargs from 'yargs';
import webUtil from './js/utils/webUtil';
import routes from './js/routes';

webUtil.addLiveReload();
webUtil.disableGlobalBackspace();

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('app'));