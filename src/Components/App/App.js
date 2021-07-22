import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Home from './Home';
import Videos from './Videos';
import Top from './Top';
import Error from './Error';
import Login from './Login';
import Logout from './Logout';
import Navigation from './Navigation';
import AuthenticatedRoute from '../../routes/AuthenticatedRoute';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation title = "Red Bull Demo"/>
        <Switch>
          <Route exact path="/">
            {localStorage.getItem("authed") === "true" ? <Redirect to="/videos" /> : <Redirect to="/login" /> }
          </Route>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
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