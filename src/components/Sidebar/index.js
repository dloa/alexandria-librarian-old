import React from 'react';
import {
    Link, IndexLink
}
from 'react-router';
import Isvg from 'react-inlinesvg';


export
default React.createClass({
    getInitialState() {
        return {
            active: 'dashboard'
        };
    },
    markActive(ref, event) {
        this.setState({
            active: ref
        });
    },
    render() {
        return (
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        <object type="image/svg+xml" data="assets/svg/logo-text.svg" className="logo"></object>
                    </a>
                </li>
                <li className={(this.state.active === 'dashboard') ? 'active' : ''}>
                    <a href="#">Dashboard</a>
                </li>
                <li>
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