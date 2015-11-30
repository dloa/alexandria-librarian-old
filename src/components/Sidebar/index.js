import React from 'react';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    History
}
from 'react-router';


export
default React.createClass({

    mixins: [PureRenderMixin, History],

    getInitialState() {
        return {
            active: '/'
        };
    },
    markActive(ref, event) {
        this.setState({
            active: ref
        });
        _.defer(this.history.replaceState.bind(this, null, ref));
    },
    render() {
        return (
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        <object type="image/svg+xml" data="images/svg/logo-text.svg" className="logo"></object>
                    </a>
                </li>
                <li onClick={this.markActive.bind(this, '/')} className={(this.state.active === '/') ? 'active' : ''}>
                    <a href="#">Dashboard</a>
                </li>
                <li onClick={this.markActive.bind(this, 'publish/dashboard')} className={(this.state.active === 'publish/dashboard') ? 'active' : ''}>
                    <a href="#">Publish</a>
                </li>
                <li ref="preferences">
                    <a href="#">Preferences</a>
                </li>
                <li>
                    <a href="#">IPFS</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
            </ul>
        );
    }
});