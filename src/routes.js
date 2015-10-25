import React from 'react';
import {
    render
}
from 'react-dom';
import {
    Router, Route, Link
}
from 'react-router';
import ReactDOM from 'react-dom';

import Framework from './components/Framework.react';
import Dashboard from './components/Dashboard.react';
import Preferences from './components/Preferences.react';
import About from './components/About.react';
import IPFSManagement from './components/IPFSManagement.react';


var routes = (
  <Router>
    <Route name="app" path="/" component={App}>
      <Route name="framework" component={Framework}>
        <Route name="dashboard" path="/dashboard" component={Dashboard}/>
        <Route name="preferences" path="/preferences" component={Preferences}/>
        <Route name="about" path="/about" component={About}/>
        <Route name="IPFSManagement" path="/management/ipfs" component={IPFSManagement}/>
      </Route>
    </Route>
  </Router>
);


render((), document.body)


module.exports = routes;