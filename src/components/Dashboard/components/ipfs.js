import React from 'react';
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
            stats: {},
            enabled: DaemonStore.getState().enabled.ipfs ? true : false,
            initStats: DaemonStore.getState().enabling.ipfs || {
                code: 0
            },
        };
    },

    componentDidMount() {
        DaemonStore.listen(this.update);
    },

    componentWillUnmount() {
        DaemonStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                enabled: DaemonStore.getState().enabled.ipfs ? true : false,
                initStats: DaemonStore.getState().enabling.ipfs || {
                    code: 0
                },
            });
        }
    },

    enableStats() {
        switch (this.state.initStats.code) {
            case 0:
            case 1:
                return {
                    task: 'Verifying Installation',
                    percent: 0
                };
                break;
            case 2:
                return {
                    task: 'Installing',
                    percent: 30
                };
                break;
            case 3:
                return {
                    task: 'Installing',
                    percent: 60
                };
                break;
            case 4:
                return {
                    task: 'Enabling',
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
            DaemonActions.ipfs(this.state.enabled ? 'disable' : 'enable')
        }
    },
    render() {
        console.log(this.state.initStats)
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
                        <input onChange={this.handleChangeEnable} type="checkbox" id="ipfs_toggle" className="cbx hidden" checked={(this.state.enabled && this.state.initStats.code === 7)} />
                        <label htmlFor="ipfs_toggle" className="lbl"></label>   
                    </div>
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
                                    <span className="text"><strong>7</strong> peers connected</span>
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="pinned">
                                    <object type="image/svg+xml" data="images/svg/location-16px_pin.svg" className="logo"/>

                                    <span className="text"><strong>118</strong> files pinned <span className="muted">(25.31 GB)</span></span>
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="upload">
                                    <object type="image/svg+xml" data="images/svg/arrows-16px-1_tail-up.svg" className="logo"/>
                                    <span className="text"><strong>1.33 KB/s</strong> uploading <span className="muted">(69 MB)</span></span>
                                </div>

                            </div>
                            <div className="col col-sm-6">
                                <div className="download">
                                    <object type="image/svg+xml" data="images/svg/arrows-16px-1_tail-down.svg" className="logo"/>
                                    <span className="text"><strong>1.33 KB/s</strong> uploading <span className="muted">(69 MB)</span></span>
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