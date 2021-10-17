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
            maxWidth: 1200,
            paddingTop: 20,
            paddingBottom: 200,
        },

        contact: {
          padding: theme.spacing(2),
          color: theme.palette.text.secondary,
          justifyContent: "center",
          width: "auto",
          margin: "auto"
      },

    }));

    const classes = useStyles();
    return (

        <div className="page">
          <h1>Member</h1>


          <div className="warpper-grid">
            <div className="content">
              <img className="crop"
                src="https://i.pinimg.com/originals/11/e5/ce/11e5ce70c99c662f2e4c1127400d6756.jpg" alt="Narok"
              />
              <p>Imron Y.</p>
            </div>
            <div className="content">
              <img className="crop" alt="Avatar"
                src="https://s.isanook.com/wo/0/ui/33/168683/roses_are_rosie_122070817_1754447088045232_4791777944367399622_n.jpg" alt="Narok"
              />
              <p>Chittawan W.</p>
            </div>
            <div className="content">
              <img className="crop" alt="Avatar"
                src="https://t1.daumcdn.net/news/201807/21/newsen/20180721171237719gxbl.jpg" alt="Narok"
              />
              <p>Jittiwat M.</p>
            </div>
            <div className="content">
              <img className="crop" alt="Avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Prayuth_2018_cropped.jpg/220px-Prayuth_2018_cropped.jpg" alt="Narok"
              />
              <p>Unknown #13649</p>
            </div>
          </div>

          <div className="contact_us">
            <Paper className={classes.contact}>
              <h5 style={{textAlign:"center"}}>contact us</h5>
              <p><MailIcon style={{ fontSize: 40 }} /> : gmail.com</p>
              <p><HomeIcon style={{ fontSize: 40 }} /> : home</p>
              <p><PhoneIphoneIcon style={{ fontSize: 40 }} /> : tel</p>
            </Paper>
          </div>

        </div>

    )

}
export default Contact;