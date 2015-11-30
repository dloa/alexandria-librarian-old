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
            enabled: false,
            initStats: {
                code: 0
            }
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
                enabled: DaemonStore.getState().enabled.ipfs || false,
                initStats: DaemonStore.getState().enabling.ipfs || this.state.initStats,
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

    render() {

        let progressInfo = this.enableStats();

        console.log(progressInfo);

        return (
            <div className="section ipfs">
                <h4>IPFS</h4>
                <button onClick={DaemonActions.ipfs.bind(this,'enable')}>Turn it on!</button>
                <If test={(this.state.initStats.code > 0 && !this.state.enabled)}>
                    <ProgressComponent task={progressInfo.task} percent={progressInfo.percent} />
                </If>
                <If test={this.state.enabled}>
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