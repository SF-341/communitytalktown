import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core/'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import '../css/Contact.css'




const Contact = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
      maxWidth: "90%",
      paddingTop: 40,
      
    },

    contact: {
      padding: theme.spacing(2),
      paddingTop: 50,
      color: theme.palette.text.secondary,
      justifyContent: "center",
      width: "auto",
      margin: "auto"
    },
    image: {
      borderRadius: "50%",
      overflow: "hidden",
      border: "solid 6px transparent",
      width: 200,
      height: 200,
      objectFit: "cover",

    },
    paper: {
      paddingTop: 20,
      justifyContent: "center",
      minHeight: 300,
      minWidth: 300,
      maxWidth: 300,
      textAlign: "center",
    },
    bgpaper: {
      textAlign: "-webkit-center",
      paddingTop: 20,
      paddingBottom: 20,
    },
    header: {
      paddingTop: 20,
      paddingBottom: 20,
    },
    contact_us: {
      margin : "auto",
      maxWidth: 500,
      paddingTop: 40,
    }

  }));

  const classes = useStyles();
  return (
    <>

      <div className={classes.root}>
        <Paper className={classes.bgpaper}>
          <h1 className={classes.header}>Developer Team</h1>
          <Grid container spacing={2}>

            <Grid item xs >
              <Paper className={classes.paper}>
                <img className={classes.image} alt="Avatar"
                  src="https://i.pinimg.com/originals/11/e5/ce/11e5ce70c99c662f2e4c1127400d6756.jpg" alt="Narok"
                />
                <h4>Imron Y.</h4>
                <p>(Senior Developer)</p>
              </Paper>

            </Grid>
            <Grid item xs >
              <Paper className={classes.paper}>
                <img className={classes.image} alt="Avatar"
                  src=" https://firebasestorage.googleapis.com/v0/b/searchbed-d2c6b.appspot.com/o/devpics%2Fkerk.jpg?alt=media&token=9581653f-64f7-43fb-ad27-9bb1e0878ca0" alt="Narok"
                />
                <h4>Chittawan W.</h4>
                <p>(Junior Developer)</p>
              </Paper>

            </Grid>
            <Grid item xs >
              <Paper className={classes.paper}>
                <img className={classes.image} alt="Avatar"
                  src="https://firebasestorage.googleapis.com/v0/b/searchbed-d2c6b.appspot.com/o/devpics%2Fkorn.jpg?alt=media&token=9a5e501a-fdb0-4d44-8020-1f1daff93fbf" alt="Narok"
                />
                <h4>Jittiwat M.</h4>
                <p>(Doccument Controller)</p>
              </Paper>

            </Grid>
            <Grid item xs >
              <Paper className={classes.paper}>
                <img className={classes.image} alt="Avatar"
                  src="https://firebasestorage.googleapis.com/v0/b/searchbed-d2c6b.appspot.com/o/devpics%2Fnot.jpg?alt=media&token=26aee5ee-98bd-4c9e-8ad6-30527c9ad662" alt="Narok"
                />
                <h4>Navapon N.</h4>
                <p>(General Stuff)</p>
              </Paper>

            </Grid>

          </Grid>
        </Paper>
        <div className={classes.contact_us}>
          <Paper className={classes.contact}>
            <h4 style={{ textAlign: "center" }}>Contact</h4>
            <p><MailIcon style={{ fontSize: 40 }} /> : progteamchat@hotmail.com</p>
            <p><HomeIcon style={{ fontSize: 40 }} /> : home</p>
            <p><PhoneIphoneIcon style={{ fontSize: 40 }} /> : 02x-xxx-xxxx</p>
          </Paper>
        </div>
      </div>
    </>
  )

}
export default Contact;