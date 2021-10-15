import React, { useContext, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../Auth";


import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Card, FormHelperText, FormControl, Paper } from '@material-ui/core';


// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import { getCovid, getCovidWeekday, getCovidRanges } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(7),
      width: 300,
    }
  },
  card: {
    minWidth: 400,

  },
  text: {
    width: 250,
  }

}));

const LogIn = () => {
  const dispatch = useDispatch();
  const UI = useSelector(state => state.UI)

  useEffect(() => {
    dispatch(getCovid());
    dispatch(getCovidWeekday());
    dispatch(getCovidRanges());

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const userData = {
      email: email.value,
      password: password.value
    }

    dispatch(loginUser(userData));
    // if (userData.email !== '' && userData.password !== '') {
    //   dispatch(loginUser(userData));
    // } else {
    //   alert('email or password invalid')
    // }


    console.log(userData);

  };



  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (

    <div className="container mt-5">

      <Grid container spacing={1}>

        <Grid container justifyContent="center" xs={12} md={6} spacing={2}>
          <Card elevation={3} className={classes.card}>

            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" align="center">
              <h1 >Log In</h1>
              <Grid item >
                <TextField className={classes.text} variant="standard" error={!UI.loading && (UI.emailerror != null || UI.error != null)} type="email" label="Email address" name="email" required />
                {!UI.loading && UI.emailerror != null ? <FormHelperText error id="component-error-text">{UI.emailerror}</FormHelperText> : ''}
              </Grid>
              <Grid item >
                <TextField className={classes.text} variant="standard" error={!UI.loading && (UI.passworderror != null || UI.emailerror != null || UI.error != null)} type="password" label="Password" name="password" required />
                {!UI.loading && UI.passworderror != null ? <FormHelperText error id="component-error-text">{UI.passworderror}</FormHelperText> : ''}
                {!UI.loading && UI.error != null ? <FormHelperText error id="component-error-text">{UI.error}</FormHelperText> : ''}
              </Grid>

              <Grid item >
                <Button type="submit" size="large" variant="outlined">Submit</Button>
              </Grid>
              <Grid item>
                <p className="forgot-password text-right"><Link to={'/ResetPass'}>Forgot password?</Link></p>
              </Grid>
            </form>
          </Card>
        </Grid>




        <Grid container justifyContent="center" xs={12} md={6} >
          <h5>asd</h5>
        </Grid>
      </Grid>
    </div>

  );
};


export default LogIn;
