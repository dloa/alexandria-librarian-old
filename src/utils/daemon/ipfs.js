import ipfsAPI from 'ipfs-api';
import Promise from 'bluebird';
import DaemonEngineStore from '../../stores/daemonEngineStore';
import CommonUtil from '../../utils/CommonUtil';

const getPeers = () => {
    return new Promise(resolve => {
        DaemonEngineStore.getState().enabled.ipfs.api.swarm.peers((err, output) => {
            resolve(err ? err : output.Strings)
        });
    });
}

const getPinned = () => {
    return new Promise(resolve => {
        DaemonEngineStore.getState().enabled.ipfs.api.pin.list((err, output) => {
            resolve(err ? err : output.Keys);
        });
    });
}

const sendCommand = (cmd, key = null, opts = {}) => {
    return new Promise(resolve => {
        DaemonEngineStore.getState().enabled.ipfs.api.send(cmd, key, opts, null, (err, output) => {
            resolve(err ? err : output[0]);
        });
    });
}

module.exports = {
    refreshStats() {
        return new Promise(resolve => {
            Promise.all([getPeers(), sendCommand('stats/bw'), getPinned()]).spread((peers, bandwidth, pinned) => {
                resolve({
                    id: 'ipfs',
                    key: 'stats',
                    stats: {
                        peers: peers.length,
                        pinned: {
                            size: 0,
                            total: pinned.length
                        },
                        speed: {
                            up: CommonUtil.formatBytes(bandwidth.RateOut, 2) + '/s',
                            down: CommonUtil.formatBytes(bandwidth.RateIn, 2) + '/s'
                        },
                        bw: {
                            up: CommonUtil.formatBytes(bandwidth.TotalOut, 1),
                            down: CommonUtil.formatBytes(bandwidth.TotalIn, 1)
                        }
                    }
                })
            });
        });
    },
    pin() {


    }
}