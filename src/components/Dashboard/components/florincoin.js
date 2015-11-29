import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


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
    render() {
        return (
            <div className="section ipfs">
                <h4>Florincoin</h4>
                 <div className="progress-container">
                    <div className="row">
                        <div className="col col-sm-6">
                            <p>Bootstrapping Blockchain</p>
                        </div>
                        <div className="col col-sm-6">
                            <div className="progress">
                                <div className="progress-bar -info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: '20%'}}>
                                    <span className="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stats">
                    <div className="row">
                        <div className="col col-sm-6">
                            <div className="peers">
                                <object type="image/svg+xml" data="images/svg/business-16px_hierarchy-53.svg" className="logo"/>
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
                <div className="detail">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ex molestiae id itaque sint, architecto pariatur omnis, officiis ipsum necessitatibus reiciendis rem quo quisquam aliquam consequatur inventore fugiat. Maiores, necessitatibus.</p>
                </div>
            </div>
        );
    }
});