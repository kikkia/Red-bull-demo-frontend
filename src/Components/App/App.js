import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Videos from './Videos';
import Top from './Top';
import Error from './Error';
import Login from './Login';
import Navigation from './Navigation';
import AuthenticatedRoute from '../../routes/AuthenticatedRoute';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation title = "Red Bull Demo"/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login}/>
          <AuthenticatedRoute 
            path="/videos" 
            component={Videos}
          />
          <AuthenticatedRoute
            path="/top"
            component={Top}
            />
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;