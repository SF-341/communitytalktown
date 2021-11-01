import React, { useEffect } from "react";
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core/'
import { BarChart, RadialBarChart, RadialBar, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Scatter } from 'recharts';

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { getCovid, getCovidWeekday, getCovidRanges } from "../redux/actions/dataActions";
import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
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
    height: 50,
    paddingTop: '10px',
    padding: 'auto',

  },
  boxGreen: {
    background: 'linear-gradient(45deg, #16b701 30%, #00fbff 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 50,
    paddingTop: '10px',
    padding: 'auto',
  },
  boxRed: {
    background: 'linear-gradient(45deg, #ed4040 30%, #ff00bb 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 50,
    paddingTop: '10px',
    padding: 'auto',
  },
  boxBlue: {
    background: 'linear-gradient(45deg, #3b63f1 30%, #1ce9e5 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 50,
    paddingTop: '10px',
    padding: 'auto',
  },

}));

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const Covidapi = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.data)
  
  const data3 = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      amt: 1400,
      cnt: 490,
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      amt: 1506,
      cnt: 590,
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      amt: 989,
      cnt: 350,
    },
    {
      name: 'Page D',
      uv: 1480,
      pv: 1200,
      amt: 1228,
      cnt: 480,
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      amt: 1100,
      cnt: 460,
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      amt: 1700,
      cnt: 380,
    },
  ];
  const items = state.covid[0];

  useEffect(() => {
    if (isEmpty(state.covid)) {
      dispatch(getCovid());
      dispatch(getCovidWeekday());
      dispatch(getCovidRanges());
      
    }

  }, [])


  const classes = useStyles();

  return (
    <><div>
      <Container>
        <div className={classes.root}>
          <Grid container spacing={1}>

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Box className={classes.boxPink} bgcolor="primary.main" color="primary.contrastText">
                  <h3>New case</h3>
                </Box>
                <br></br>
                <h3> {items && items ? items.new_case : "0"}</h3>
                <br></br>
                <h6>Total case</h6>
                <h6>{items && items ? items.total_case : "0"}</h6>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Box className={classes.boxBlue} bgcolor="primary.main" color="primary.contrastText">
                  <h3>New case excludeabroad</h3>
                </Box>
                <br></br>
                <h3> {items && items ? items.new_case_excludeabroad : "0"}</h3>
                <br></br>
                <h6>Total case excludeabroad</h6>
                <h6>{items && items ? items.total_case_excludeabroad : "0"}</h6>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>

                <Box className={classes.boxRed} bgcolor="primary.main" color="primary.contrastText">
                  <h3>New death</h3>
                </Box>
                <br></br>
                <h3> {items && items ? items.new_death : "0"}</h3>
                <br></br>
                <h6>Total death</h6>
                <h6>{items && items ? items.total_death : "0"}</h6>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Box className={classes.boxGreen} bgcolor="primary.main" color="primary.contrastText">
                  <h3>New recovered</h3>
                </Box>
                <br></br>
                <h3> {items && items ? items.new_recovered : "0"}</h3>
                <br></br>
                <h6>Total recovered</h6>
                <h6>{items && items ? items.total_recovered : "0"}</h6>
              </Paper>
            </Grid>


            <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={state.covid_weekday}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="txn_date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="new_death" fill="#8884d8" />
              <Bar dataKey="new_case" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={state.covid_range}>
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
            </RadialBarChart>
          </ResponsiveContainer>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
            <ResponsiveContainer width={1225} height={500}>
            <ComposedChart
              width={1000}
              height={500}
              data={data3}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="pv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              <Scatter dataKey="cnt" fill="red" />
            </ComposedChart>
          </ResponsiveContainer>
            </Paper>
            </Grid>
        </Grid>
        </div>
      </Container>

    </div>


    </>

  );
};


export default Covidapi;
