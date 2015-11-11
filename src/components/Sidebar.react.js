import React from 'react';
import {
    Link, IndexLink
}
from 'react-router';
import Isvg from 'react-inlinesvg';


export
default React.createClass({
    markActive(e) {

    },
    render() {
        return (
            <ul className="sidebar">
              <div className="sidebar-logo">
                <Isvg src="./images/logo.svg" />
              </div>
              <IndexLink to="/">
                <li>
                  <p>Dashboard</p>
                </li>
              </IndexLink>
              <Link to="publish">
                <li>
                  <p>Publish</p>
                </li>
              </Link>
              <Link to="preferences">
                <li>
                  <p>Preferences</p>
                </li>
              </Link>
              <Link to="about">
                <li>
                  <p>About</p>
                </li>
              </Link>
              <Link to="IPFSManagement">
                <li>
                  <p>IPFS</p>
                </li>
              </Link>
            </ul>
        );
    }
});