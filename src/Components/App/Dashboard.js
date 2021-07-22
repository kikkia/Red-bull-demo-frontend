import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core'
import RecruitPosts from "./RecruitPost"
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    if (!localStorage.getItem("guild")) {
      history.push('/guilds');
      return(<div></div>)
    }

    return (
       <div className={classes.root}>
          <h1>Dashboard</h1>
          <p>Home page body content</p>
          <RecruitPosts></RecruitPosts>
       </div>
    );
}
 
export default Dashboard;