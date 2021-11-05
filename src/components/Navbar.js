import React, { useContext, useState, useEffect } from "react";

// css
import Avatar from "@material-ui/core/Avatar";

import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

import { ColorModeContext } from './UI/Colormode'

import { deepPurple } from "@material-ui/core/colors";
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { grey } from '@mui/material/colors';



// Redux stuff
import { logoutUser } from "../redux/actions/userActions"
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.user)

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  // const [isLoading, setIsLoading] = useState(true);
  const userName = state.username;

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);


  // if (isLoading) {
  //   if (data.loading) {
  //     setUserName(data.data.username);
  //     setIsLoading(false);
  //   }
  // }

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const closeMobileMenuSignout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    setClick(false);
  };


  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
      },
      margin: theme.spacing(2),
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    bgcolor: {
      backgroundColor: theme.palette.mode === "dark" ? grey[900] : grey[600],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.2rem',
      position: 'sticky',
      top: 0,
      zIndex: 999,

    },
    menuIcon: {
      alignItems: "right",
    }
  }));

  const classes = useStyles();

  return (
    <>

      <nav className={classes.bgcolor}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            CMTT&nbsp;
            <i className="far fa-comment" />
          </Link>

          {!button ? (
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          ) : ''}


          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                <Typography>Home</Typography>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <Typography>Dashboard</Typography>

              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <Typography>Contacts</Typography>

              </Link>
            </li>

            <li>
              {!state.authenticated ? (
                <div>
                  <Link
                    to="/LogIn"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div
                  className="nav-links-mobile"
                  onClick={closeMobileMenuSignout}
                >
                  Sign Out
                </div>
              )}
            </li>
          </ul>


          {button ? (<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>) : ''}



          {!state.authenticated
            ? button && (
              <Link to="/login">
                <Button buttonStyle="btn--outline">SIGN&nbsp;IN</Button>
              </Link>
            )
            : button && (
              <Button buttonStyle="btn--outline">SIGN&nbsp;OUT</Button>
            )}

          <>&nbsp;&nbsp;</>

          {!state.authenticated ? (
            button && (
              <Link to="/signup">
                <Button buttonStyle="btn--outline">SIGN&nbsp;UP</Button>
              </Link>
            ))
            :
            (<div className={classes.root}>
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                {state.image !== null ? <Avatar src={state.image}></Avatar> : <Avatar className={classes.purple}>{userName[0]}</Avatar>}
              </Link>
            </div>)}
        </div>
      </nav>


    </>

  );
};

export default Navbar;
