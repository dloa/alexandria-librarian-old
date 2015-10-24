import Promise from 'bluebird';
import getPort from 'get-port';


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
