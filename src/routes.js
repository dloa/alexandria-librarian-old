import React from 'react';
import {
    Route, IndexRoute
}
from 'react-router';

import Framework from './components/Framework.react';
import Dashboard from './components/Dashboard';
import PublishDash from './components/Publish';


export
default (
    <Route path="/" component={Framework}>
      <IndexRoute component={Dashboard}/>

      <Route path="publish/dashboard" component={PublishDash} />

    </Route>
);