import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth";
import { Link } from "react-router-dom"


import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Card, FormHelperText } from '@material-ui/core';
import { grey } from '@mui/material/colors';



// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { loginUser, resetpassword } from "../../redux/actions/userActions";
import { getCovid, getCovidWeekday, getCovidRanges, setbackdrop } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(7),
      width: 300,
    }
  },
  card: {
    margin: "auto",
    maxWidth: 400,
    height: 600,
  },
  text: {
    width: 250,
  },
  image: {
    width: 500,
    height: "auto",
  },
  container: {
    padding: theme.spacing(5),
    spacing: theme.spacing(2),
    margin: "auto",
    textAlign: "center"
  },
  title: {
    textAlign: "center",
    display: "inline",
  },
  closebtn: {
    textAlign: "right",
    paddingRight: 10,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      color: grey[900],
    }
  },
  link: {
    textDecoration: 'none',
  }

}));

const LogInForm = () => {
  const dispatch = useDispatch();
  const UI = useSelector(state => state.UI)
  const user = useSelector(state => state.user)

  const [showResetPassword, setShowResetPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const userData = {
      email: email.value,
      password: password.value
    };
    dispatch(loginUser(userData));
  }

  const handleClick = (e) => {
    e.preventDefault();
    const { email } = e.target.elements;
    dispatch(resetpassword(email.value));
  }
  const handleClickBackDrop = () => {
    dispatch(setbackdrop(false));
  }

  const classes = useStyles();


  return (

    <Grid container justifyContent="center" spacing={5} className={classes.container}>

      <Grid item spacing={5} className={classes.container} xs>
        <Card d elevation={3} className={classes.card}>
          <div><h2 onClick={handleClickBackDrop} className={classes.closebtn}>x</h2></div>
          {showResetPassword ?
            <form onSubmit={handleClick} className={classes.root} noValidate autoComplete="off" align="center">
              <h1 >Reset Password</h1>
              <Grid item >
                <TextField className={classes.text} type="email" label="Email address" name="email" required helperText={user.resetpassword ? "Password Reset Email Sent!" : ""} color="primary" />

              </Grid>
              <Grid item >
                <Button type="submit" size="medium" >Send Reset Password</Button>
                <br /><br />
                <Button size="large" variant="outlined" onClick={() => { setShowResetPassword(false) }}>Log in</Button>
              </Grid>
            </form>

            : <>
              <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" align="center">

                <h1 className={classes.title}>Log In</h1>

                <Grid item >
                  <TextField className={classes.text} variant="standard" error={!UI.loading && (UI.emailerror != null || UI.error != null)} type="email" label="Email address" name="email" required />
                  {!UI.loading && UI.emailerror != null ? <FormHelperText error id="component-error-text">{UI.emailerror}</FormHelperText> : ''}
                </Grid>
                <Grid item >
                  <TextField className={classes.text} variant="standard" error={!UI.loading && (UI.passworderror != null || UI.emailerror != null || UI.error != null)} type="password" label="Password" name="password" required />
                  {!UI.loading && UI.passworderror != null ? <FormHelperText error id="component-error-text">{UI.passworderror}</FormHelperText> : ''}
                  {!UI.loading && UI.error != null ? <FormHelperText error id="component-error-text">{UI.error}</FormHelperText> : ''}
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item xs>
                    <Button type="submit" size="large" variant="outlined">Submit</Button>
                  </Grid>
                  <Grid item xs>
                    <Link to="/signup" className={classes.link}>
                      <Button size="large" variant="outlined" >Sign up</Button>
                    </Link>
                  </Grid>
                </Grid>


                <Grid item>
                  <Button size="large" color="secondary" variant="outlined" onClick={() => { setShowResetPassword(true) }}>Forgot password?</Button>
                </Grid>

              </form></>

          }

        </Card>
      </Grid>

    </Grid>

  );
};


export default LogInForm;
