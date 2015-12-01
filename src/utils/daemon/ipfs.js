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
            resolve(total)
        })
    });
}

const getPinned = () => {
    return new Promise((resolve, reject) => {
        DaemonEngineStore.getState().enabled.ipfs.api.pin.list((err, output) => {
            if (err) return reject(err);
            getPinnedSize(Object.keys(output.Keys)).then(size => {
                resolve({
                    total: output.Keys,
                    size: size
                })
            });
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
    refreshStats() {
        return new Promise(resolve => {
            Promise.all([getPeers(), sendCommand('stats/bw'), getPinned()])
                .spread((peers, bandwidth, pinned) => {
                    resolve({
                        id: 'ipfs',
                        key: 'stats',
                        stats: {
                            peers: peers.length,
                            pinned: {
                                size: CommonUtil.formatBytes(pinned.size.toFixed(3), 2),
                                total: Object.keys(pinned.total).length
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
    },
    pin() {


    }
}