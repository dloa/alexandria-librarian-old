import React from 'react';


let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({

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
                <h4>IPFS</h4>
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
                                <object type="image/svg+xml" data="images/svg/location-16px_pin.svg" className="logo"></object>

                                <span className="text"><strong>118</strong> files pinned <span className="muted">(25.31 GB)</span></span>
                            </div>
                        </div>
                        <div className="col col-sm-6">
                            <div className="upload">
                                <object type="image/svg+xml" data="images/svg/arrows-16px-1_tail-up.svg" className="logo"></object>
                                <span className="text"><strong>1.33 KB/s</strong> uploading <span className="muted">(69 MB)</span></span>
                            </div>

                        </div>
                        <div className="col col-sm-6">
                            <div className="download">
                                <object type="image/svg+xml" data="images/svg/arrows-16px-1_tail-down.svg" className="logo"></object>
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