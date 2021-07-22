import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, Button, Avatar, List, Drawer, 
    ListItem, Divider, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'js-cookie'
import avatarUtils from '../../utils/avatars';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { NavLink } from 'react-router-dom';
 
const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Navigation = (props) => {
    const classes = useStyles();
    const title = props.title;
    const auth = localStorage.getItem("authed");
    const [state, setState] = React.useState({
        state: false
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, state: open });
      };

    let avatarUrl = "https://avatarfiles.alphacoders.com/922/thumb-1920-92219.jpg"
    const userButton = auth === "true" ?
        <Button variant="contained" color="secondary" startIcon={<Avatar src={avatarUrl}/>}>
            {Cookies.get("username")}
        </Button> :
        <Button color="inherit" href='/login'>
            Login
        </Button>

    // Defines nav drawer pages
    const list = () => (
        <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
        <List>
            <ListItem button key="home">
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <NavLink to="/videos">Home</NavLink>
            </ListItem>
            <ListItem button key="Content">
                <ListItemIcon><DashboardIcon/></ListItemIcon>
                <NavLink to="/videos">Content</NavLink>
            </ListItem>
            <ListItem button key="Top Rated">
                <ListItemIcon><ThumbUpIcon/></ListItemIcon>
                <NavLink to="/top">Top Rated</NavLink>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button key="Logout">
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <NavLink to="/logout">Logout</NavLink>
            </ListItem>
        </List>
        </div>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" 
                    className={classes.menuButton} onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={state["state"]} onClose={toggleDrawer(false)}>
                    {list("left")}
                </Drawer>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                {userButton}
            </Toolbar>
        </AppBar>
    );
}
 
export default withRouter(Navigation);