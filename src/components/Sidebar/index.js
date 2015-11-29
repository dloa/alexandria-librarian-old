import React from 'react';
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
            active: 'dashboard'
        };
    },
    markActive(ref, event) {
        this.setState({
            active: ref
        });
        this.history.replaceState(null, ref);
    },
    render() {
        return (
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        <object type="image/svg+xml" data="images/svg/logo-text.svg" className="logo"></object>
                    </a>
                </li>
                <li onClick={this.markActive.bind(this, 'dashboard')} className={(this.state.active === 'dashboard') ? 'active' : ''}>
                    <a href="#">Dashboard</a>
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

