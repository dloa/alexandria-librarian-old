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
            enabled: false
        };
    },

    componentDidMount() {
        // daemonStore.listen(this.update);
    },

    componentWillUnmount() {
        //daemonStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({

            });
        }
    },
    enable() {
        DaemonActions.ipfs('enable');
        /*
        this.setState({
            enabled: true
        }); */
    },
    render() {
        return (
            <div className="section ipfs">
                <h4>IPFS</h4>
                <button onClick={this.enable}>Turn it on!</button>

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