import React from 'react';
import {
    Router, Route, IndexRoute
}
from 'react-router';

import Framework from './components/Framework.react';
import Dashboard from './components/Dashboard.react';
import Preferences from './components/Preferences.react';
import PublishDashboard from './components/PublishDashboard.react';
import About from './components/About.react';
import IPFSManagement from './components/IPFSManagement.react';


export
default (
    <Route path="/" component={Framework}>
      <IndexRoute component={Dashboard}/>

      <Route path="/publish" component={PublishDashboard}/>
      <Route path="/preferences" component={Preferences}/>
      <Route path="/about" component={About}/>
      <Route path="/IPFSManagement" component={IPFSManagement}/>
    </Route>
);