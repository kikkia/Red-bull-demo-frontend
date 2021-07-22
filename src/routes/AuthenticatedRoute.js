import {Redirect, Route} from 'react-router-dom';

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={
            props => 
                localStorage.authed === "true" 
                ? <C {...props} {...appProps}/>
                : <Redirect to={`/login`}/>}
      />
    );
  }