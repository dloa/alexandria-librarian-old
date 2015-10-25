import React from 'react';
import {
    Route
}
from 'react-router';


import Framework from './components/Framework.react';
import Dashboard from './components/Dashboard.react';
import Preferences from './components/Preferences.react';
import About from './components/About.react';
import IPFSManagement from './components/IPFSManagement.react';


var routes = (
    <Route name="app" path="/" component={App}>
      <Route name="framework" component={Framework}>
        <Route name="dashboard" path="/dashboard" component={Dashboard}/>
        <Route name="preferences" path="/preferences" component={Preferences}/>
        <Route name="about" path="/about" component={About}/>
        <Route name="IPFSManagement" path="/management/ipfs" component={IPFSManagement}/>
      </Route>
    </Route>
);


var App = React.createClass({
    render: function() {
        return ({
            routes
        });
    }
});

module.exports = routes;