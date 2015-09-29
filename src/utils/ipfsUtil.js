import _ from 'lodash';
import path from 'path';
import Promise from 'bluebird';
import request from 'request';
import fs from 'fs';
import util from './Util';


module.exports = {

    run: function(path) {
        return util.exec([path.join(process.cwd(), '/bin/win/ipfs.exe'), 'daemon'])
    }

};