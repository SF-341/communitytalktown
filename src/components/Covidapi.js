import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";

import { makeStyles, withStyle } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core/'




const Covidapi = () => {
  const [items, setItems] = useState([]);
  const [checkItems, setCheckItems] = useState(true);

  async function fecthCovidapi() {
    await fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
      .then(result => {
        if (result.length === 0) {
          setCheckItems(false);
        } else {
          setItems(result[0]);
        }
      })


  }

  useEffect(() => {
    fecthCovidapi()

  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    boxPink: {
      background: 'linear-gradient(45deg, #ee3fb7 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 80,
      padding: '15px',
    },
    boxGreen: {
      background: 'linear-gradient(45deg, #16b701 30%, #00fbff 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 80,
      padding: '15px',
    },
    boxRed: {
      background: 'linear-gradient(45deg, #ed4040 30%, #ff00bb 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 80,
      padding: '15px',
    },
    boxBlue: {
      background: 'linear-gradient(45deg, #3b63f1 30%, #1ce9e5 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 80,
      padding: '10px',
    },
  }));


  //const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {
  //     return <Redirect to="/login" />;
  // }

  const classes = useStyles();

  return (
    <div>
      <Container>
        <div container className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" color="inherit">
                  <Box className={classes.boxPink} bgcolor="primary.main" color="primary.contrastText">
                    New case
                  </Box>
                </Typography>
                <Typography variant="h6" color="inherit">
                  {checkItems ? items.new_case : "0"}
                </Typography>
                <Typography variant="h8" color="inherit">
                  Total case
                </Typography>
                <Typography variant="h6" color="inherit">
                  {checkItems ? items.total_case : "0"}
                </Typography></Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paper}>

                <Box className={classes.boxBlue} bgcolor="primary.main" color="primary.contrastText">
                  <Typography variant="h5" color="inherit">New case excludeabroad</Typography>

                </Box>

                <Typography variant="h6" color="inherit">
                  {checkItems ? items.new_case_excludeabroad : "0"}
                </Typography>
                <Typography variant="h8" color="inherit">
                  Total case excludeabroad
                </Typography>
                <Typography variant="h6" color="inherit">
                  {checkItems ? items.total_case_excludeabroad : "0"}
                </Typography></Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" color="inherit">
                  <Box className={classes.boxRed} bgcolor="primary.main" color="primary.contrastText">
                    New death
                  </Box>
                </Typography>
                <Typography variant="h6" color="inherit">
                  {checkItems ? items.new_death : "0"}
                </Typography>
                <Typography variant="h8" color="inherit">
                  Total death
                </Typography>
                <Typography variant="h6" color="inherit">
                  {checkItems ? items.total_death : "0"}
                </Typography></Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" color="inherit">
                  <Box className={classes.boxGreen} bgcolor="primary.main" color="primary.contrastText">
                    New recovered
                  </Box>
                </Typography>
                <Typography variant="h6" color="inherit">
                  {checkItems ? items.new_recovered : "0"}
                </Typography>
                <Typography variant="h8" color="inherit">
                  Total recovered
                </Typography>
                <Typography variant="h6" color="inherit">
                  {checkItems ? items.total_recovered : "0"}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};


export default Covidapi;
