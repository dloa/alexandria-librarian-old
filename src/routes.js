import React from 'react';
import {
    Router, Route, IndexRoute
}
from 'react-router';
import ReactDOM from 'react-dom';

import Framework from './components/Framework.react';
import Dashboard from './components/Dashboard.react';
import Preferences from './components/Preferences.react';
import PublishDashboard from './components/PublishDashboard.react';
import About from './components/About.react';
import IPFSManagement from './components/IPFSManagement.react';


export
default (
    <Route path="/" component={Framework}>
      <IndexRoute name="dashboard" component={Dashboard}/>

      <Route name="publish" path="/publish" component={PublishDashboard}/>
      <Route name="preferences" path="/preferences" component={Preferences}/>
      <Route name="about" path="/about" component={About}/>
      <Route name="IPFSManagement" path="/management/ipfs" component={IPFSManagement}/>
    </Route>
);