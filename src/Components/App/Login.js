import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField, {TextFieldProps} from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  TextField: {
    background: "#fff",
  },
  Link: {
    color: '#00FFFF'
  }
}));


export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [register, setReg] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const registerNewUser = () => {
    if (!usernameValid || !passwordValid) {
      setError("Username or password is invalid")
      return
    }
    let url = "/api/auth/register?username=" + username + "&pass=" + password;
    fetch(url,
          {
            method: 'POST',
            credentials: 'include',
            mode: "cors"
          })
              .then(
                  (result) => {
                      if (result.status === 409) {
                        // Dupe username
                        setError("Username Taken")
                      }
                      if (result.status === 200) {
                        setReg(false)
                        setSuccess("User created")
                      } else {
                        setError("Something went wrong. Please try again")
                      }
                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                      setError(error);
                  }
        )
  };

  const signIn = () => {
    if (!usernameValid || !passwordValid) {
      setError("Username or password is invalid")
      return
    }
    let url = "/api/auth/login?username=" + username + "&pass=" + password;
    fetch(url,
          {
            method: 'POST',
            credentials: 'include',
            mode: "cors"
          })
              .then(
                  (result) => {
                      if (result.status === 200) {
                        localStorage.setItem("authed", true);
                        history.push("/videos");
                      } else {
                        if (result.status === 401) {
                          setError("Invalid login credentials")
                        } else {
                          setError("Something went wrong. Please try again")
                        }
                      }
                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                      setError(error);
                  }
        )
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError("");
    setSuccess("");
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value)
  }

  const passwordMismatch = confirmPassword !== password;
  const usernameValid = username.length >= 3 && username.length < 100;
  const passwordValid = password.length >= 3 && password.length < 200;

  if (register) {
    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Snackbar open={success !== ""} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {success}
            </Alert>
          </Snackbar>
          <Snackbar open={error !== ""} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
            <TextField
              inputProps = {{
                className: classes.TextField
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              error={!usernameValid}
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              inputProps = {{
                className: classes.TextField
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <TextField
              inputProps = {{
                className: classes.TextField
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="ReType password"
              type="password"
              id="confirmPassword"
              helperText={passwordMismatch ? "Passwords do not match" : ""}
              error={passwordMismatch}
              autoComplete="current-password"
              onChange={handleConfirmPasswordChange}
            />
            <Button
              type=""
              fullWidth
              variant="contained"
              color="primary"
              onClick={registerNewUser}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" class={classes.Link} onClick={() => {
                          setReg(false)}}>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
        </div>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Snackbar open={success !== ""} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {success}
            </Alert>
          </Snackbar>
          <Snackbar open={error !== ""} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <TextField
              inputProps = {{
                className: classes.TextField
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              error={!usernameValid}
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              inputProps = {{
                className: classes.TextField
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" class={classes.Link} onClick={() => {
                          setReg(true)}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </div>
      </Container>
    );
  }
}
