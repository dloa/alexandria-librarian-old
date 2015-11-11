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
            <ul className="sidebar">
              <div className="sidebar-logo">
                <Isvg src="./images/logo.svg" />
              </div>
              <IndexLink onClick={this.markActive.bind(this, 'dashboard')} to="/">
                <li className={(this.state.active === 'dashboard') ? 'active' : ''}>
                  <p>Dashboard</p>
                </li>
              </IndexLink>
              <Link onClick={this.markActive.bind(this, 'publish')} to="publish">
                <li className={(this.state.active === 'publish') ? 'active' : ''}>
                  <p>Publish</p>
                </li>
              </Link>
              <Link onClick={this.markActive.bind(this, 'preferences')} to="preferences">
                <li className={(this.state.active === 'preferences') ? 'active' : ''}>
                  <p>Preferences</p>
                </li>
              </Link>
              <Link onClick={this.markActive.bind(this, 'about')} to="about">
                <li className={(this.state.active === 'about') ? 'active' : ''}>
                  <p>About</p>
                </li>
              </Link>
              <Link onClick={this.markActive.bind(this, 'IPFSManagement')} to="IPFSManagement">
                <li className={(this.state.active === 'IPFSManagement') ? 'active' : ''}>
                  <p>IPFS</p>
                </li>
              </Link>
            </ul>
        );
    }
});