import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import firebaseConfig from "../../config";

//css
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Card, } from '@material-ui/core';

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
    minWidth: 250,
  }
}));

const ResetPass = () => {
  const [sended, setSended] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = e.target.elements;
    firebaseConfig.auth().sendPasswordResetEmail(email.value).then(function () {
      console.log('Password Reset Email Sent!');
      setSended(true);
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode === 'auth/user-not-found') {
        alert(errorMessage);
      }
    });

  }



  const classes = useStyles();

  if (sended) {
    return <Redirect to="/Login" />;
  }

  return (

    <div className="container mt-5">

      <Grid container spacing={1}>

        <Grid container justifyContent="center" xs={12} md={6} spacing={0}>
          <Card elevation={3} className={classes.card}>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" align="center">
              <h1 >Reset Password</h1>
              <Grid item >
                <TextField className={classes.text} type="email" label="Email address" name="email" required />
              </Grid>
              <Grid item >
                <Button type="submit" size="medium" variant="outlined">Send Reset Password</Button>
              </Grid>
            </form>
          </Card>
        </Grid>


        <Grid container justifyContent="center" xs={12} md={6} >
          <h5>asdasdasd</h5>
        </Grid>
      </Grid>

    </div>
  );
};

export default ResetPass;