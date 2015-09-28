import React from 'react/addons';
import Router from 'react-router';

var Sidebar = React.createClass({
  componentWillMount: function () {
    this.start = Date.now();
  },
  render: function () {
    return (
      <ul className="sidebar">
        <Router.Link to="dashboard">
          <li>
            <p>Dashboard</p>
          </li>
        </Router.Link>
        <Router.Link to="preferences">
          <li>
            <p>Preferences</p>
          </li>
        </Router.Link>
        <Router.Link to="about">
          <li>
            <p>About</p>
          </li>
        </Router.Link>
      </ul>
    );
  }
});

module.exports = Sidebar;
