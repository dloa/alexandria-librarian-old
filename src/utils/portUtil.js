import Promise from 'bluebird';
import fs from 'fs';
import getPort from 'get-port';
import util from './Util';
import path from 'path';

module.exports = {
    checkPort: function(port){
    },
    getFreePort: function () {
      return new Promise((resolve, reject) => {
          getPort((err, port) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(port);
              }
          });
      });
    }
}
