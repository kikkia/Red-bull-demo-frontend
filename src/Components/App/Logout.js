import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Logout = () => {
    const history = useHistory();

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        localStorage.setItem("authed", false);
        fetch('api/auth/logout',
            {
                method: 'POST',
                credentials: 'include',
                mode: "cors"
            })
            .then((result) => {
                history.push('/login')
            })
    })

    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <h1>Logging out...</h1>
        </div>
      </Container>
    );
}
export default Logout;