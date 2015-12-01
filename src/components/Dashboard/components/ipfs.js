import React from 'react';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ProgressComponent from './progress';

import DaemonStore from '../../../stores/daemonEngineStore';
import DaemonActions from '../../../actions/daemonEngineActions';


let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            stats: _.has(DaemonStore.getState().enabled, 'ipfs.stats') ? DaemonStore.getState().enabled.ipfs.stats : {
                peers: 0,
                pinned: {
                    size: ' loading... ',
                    total: {}
                },
                speed: {
                    up: '0 KB/s',
                    down: '0 KB/s'
                },
                bw: {
                    up: '0 KB',
                    down: '0 KB'
                }
            },
            enabled: DaemonStore.getState().enabled.ipfs || false,
            initStats: DaemonStore.getState().enabling.ipfs || {
                code: 0
            },
            gotPinedSize: false
        };
    },

    componentDidMount() {
        DaemonStore.listen(this.update);
        _.defer(this.refreshStats);
    },

    componentWillUnmount() {
        DaemonStore.unlisten(this.update);
    },

    refreshStats() {
        if (this.state.initStats.code === 7) {
            DaemonActions.ipfs('refresh-stats');

            if (Object.keys(this.state.stats.pinned.total).length > 0 && !this.state.gotPinedSize) {
                this.setState({
                    gotPinedSize: true
                });
                _.defer(() => {
                    DaemonActions.ipfs('pinned-total', Object.keys(this.state.stats.pinned.total))
                });
            }
        }
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                stats: _.has(DaemonStore.getState().enabled, 'ipfs.stats') ? DaemonStore.getState().enabled.ipfs.stats : {
                    peers: 0,
                    pinned: {
                        size: 0,
                        total: 0
                    },
                    speed: {
                        up: 0,
                        down: 0
                    },
                    bw: {
                        up: 0,
                        down: 0
                    }
                },
                enabled: DaemonStore.getState().enabled.ipfs || false,
                initStats: DaemonStore.getState().enabling.ipfs || {
                    code: 0
                },
            });
            _.delay(() => {
                _.defer(this.refreshStats);
            }, 1000);
        }
    },

    enableStats() {
        switch (this.state.initStats.code) {
            case 0:
            case 1:
                return {
                    task: 'Verifying Installation...',
                    percent: 0
                };
                break;
            case 2:
                return {
                    task: 'Installing...',
                    percent: 30
                };
                break;
            case 3:
                return {
                    task: 'Installing...',
                    percent: 60
                };
                break;
            case 4:
                return {
                    task: 'Initializing...',
                    percent: 90
                };
                break;
            case 7:
                return {
                    task: 'Enabled',
                    percent: 100
                };
                break;
        }
    },
    handleChangeEnable() {
        if (this.state.initStats.code === 7 || this.state.initStats.code === 0) {
            let toggle = this.state.enabled ? 'disable' : 'enable';
            if (toggle === 'disable')
                this.setState({
                    gotPinedSize: false
                });
            DaemonActions.ipfs(toggle)
        }
    },
    render() {
        let progressInfo = this.enableStats();
        return (
            <div className="section ipfs">
                <div className="clearfix">
                    <div className="pull-left">
                        <h4 className="title">IPFS</h4>
                    </div>
                    <div className="pull-left">
                        <a href="#" className="svg btn-settings">
                            <object type="image/svg+xml" data="images/svg/ui-16px-1_settings-gear-64.svg"/>
                        </a>
                    </div>
                    <div className="pull-right">
                        <input onChange={this.handleChangeEnable}  type="checkbox" id="checked" className="toggle hidden" checked={(this.state.enabled && this.state.initStats.code === 7)}/>
                        <label htmlFor="checked" className="lbl"></label>   
                    </div>
                    <If test={(this.state.initStats.code !== 0 && this.state.initStats.code !== 7)}>
                        <div className="pull-right enabling">
                            <span className="label label-default-flash">Enabling ...</span>
                        </div>
                    </If>
                </div>
                <If test={(this.state.initStats.code !== 0 && this.state.initStats.code !== 7)}>
                    <ProgressComponent task={progressInfo.task} percent={progressInfo.percent} />
                </If>
                <If test={(this.state.initStats.code === 7)}>
                    <div className="stats">
                        <div className="row">
                            <div className="col col-sm-6">
                                <div className="peers">
                                    <object type="image/svg+xml" data="images/svg/business-16px_hierarchy-53.svg" className="logo"></object>
                                    <span className="text"><strong>{this.state.stats.peers}</strong> peers connected</span>
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="pinned">
                                    <object type="image/svg+xml" data="images/svg/location-16px_pin.svg" className="logo"/>

                                    <span className="text"><strong>{Object.keys(this.state.stats.pinned.total).length}</strong> files pinned <span className="muted">({this.state.stats.pinned.size})</span></span>
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="upload">
                                    <object type="image/svg+xml" data="images/svg/arrows-16px-1_tail-up.svg" className="logo"/>
                                    <span className="text"><strong>{this.state.stats.speed.up}</strong> uploading <span className="muted">({this.state.stats.bw.up})</span></span>
                                </div>

                            </div>
                            <div className="col col-sm-6">
                                <div className="download">
                                    <object type="image/svg+xml" data="images/svg/arrows-16px-1_tail-down.svg" className="logo"/>
                                    <span className="text"><strong>{this.state.stats.speed.down}</strong> uploading <span className="muted">({this.state.stats.bw.down})</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </If>
                <div className="detail">
                    <p>The InterPlanetary File System (IPFS) is a new hypermedia distribution protocol, addressed by content and identities. 
                    IPFS enables the creation of completely distributed applications. It aims to make the web faster, safer, and more open.</p>
                </div>
            </div>
        );
    }
});