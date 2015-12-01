import ipfsAPI from 'ipfs-api';
import _ from 'lodash';
import Promise from 'bluebird';
import DaemonEngineStore from '../../stores/daemonEngineStore';
import CommonUtil from '../../utils/CommonUtil';



const getPeers = () => {
    return new Promise((resolve, reject) => {
        DaemonEngineStore.getState().enabled.ipfs.api.swarm.peers((err, output) => {
            err ? reject(err) : resolve(output.Strings);
        });
    });
}

const getPinnedSize = pinned => {
    let total = 0;
    return new Promise(resolve => {
        DaemonEngineStore.getState().enabled.ipfs.api.ls(pinned, (err, res) => {
            res.Objects.forEach(node => {
                if (node.Links.length > 0) {
                    node.Links.forEach(link => {
                        total = total + link.Size;
                    })
                }
            })
            let stats = DaemonEngineStore.getState().enabled.ipfs.stats;
            stats.pinned.size = CommonUtil.formatBytes(total.toFixed(3), 2);
            resolve({
                id: 'ipfs',
                key: 'stats',
                stats: stats
            });
        })
    });
};

const getPinned = () => {
    return new Promise((resolve, reject) => {
        DaemonEngineStore.getState().enabled.ipfs.api.pin.list((err, output) => {
            if (err) return reject(err);
            resolve(output.Keys);
        });
    });
}

const sendCommand = (cmd, key = null, opts = {}) => {
    return new Promise((resolve, reject) => {
        DaemonEngineStore.getState().enabled.ipfs.api.send(cmd, key, opts, null, (err, output) => {
            err ? reject(err) : resolve(output[0]);
        });
    });
}

module.exports = {
    refreshStats(pinned = false) {
        if (pinned)
            return getPinnedSize(pinned);

        return new Promise(resolve => {
            Promise.all([getPeers(), sendCommand('stats/bw'), getPinned()])
                .spread((peers, bandwidth, pinned) => {
                    resolve({
                        id: 'ipfs',
                        key: 'stats',
                        stats: {
                            peers: peers.length,
                            pinned: {
                                size: _.has(DaemonEngineStore.getState().enabled, 'ipfs.stats.pinned.size') ? DaemonEngineStore.getState().enabled.ipfs.stats.pinned.size : ' loading... ',
                                total: pinned
                            },
                            speed: {
                                up: CommonUtil.formatBytes(bandwidth.RateOut.toFixed(3), 2) + '/s',
                                down: CommonUtil.formatBytes(bandwidth.RateIn.toFixed(3), 2) + '/s'
                            },
                            bw: {
                                up: CommonUtil.formatBytes(bandwidth.TotalOut.toFixed(3), 2),
                                down: CommonUtil.formatBytes(bandwidth.TotalIn.toFixed(3), 2)
                            }
                        }
                    })
                }).catch(err => {
                    console.error('IPFS refreshStats()', err);
                });
        });
    }
}