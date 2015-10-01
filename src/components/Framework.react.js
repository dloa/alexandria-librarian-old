import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import Sidebar from './Sidebar.react';

var Client = React.createClass({

  getInitialState: function () {
    return {
      sidebarOffset: 0
    };
  },

  handleScroll: function (e) {
    if (e.target.scrollTop > 0 && !this.state.sidebarOffset) {
      this.setState({
        sidebarOffset: e.target.scrollTop
      });
    } else if (e.target.scrollTop === 0 && this.state.sidebarOffset) {
      this.setState({
        sidebarOffset: 0
      });
    }
  },

  
  render: function () {
    return (
      <div>
        <div className="content-container">
          <Sidebar />
          <Router.RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = Client;
