import React from 'react';
import {
    Link
}
from 'react-router';
import Isvg from 'react-inlinesvg';


export
default React.createClass({
    componentWillMount: function() {
        this.start = Date.now();
    },
    render: function() {
        return (
            <ul className="sidebar">
              <div className="sidebar-logo">
                <Isvg src="./images/logo.svg" />
              </div>
              <Link to="dashboard">
                <li>
                  <p>Dashboard</p>
                </li>
              </Link>
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