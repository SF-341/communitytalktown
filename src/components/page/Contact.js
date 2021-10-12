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
        icon: {
            paddingLeft: 800,
            padding: 'auto',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            width: 300,

        },
        owner: {
            textAlign: '-webkit-center',
        }

    }));

    const classes = useStyles();
    return (
        <><div>
            <Container>
                <div className={classes.root}>
                    <Grid container spacing={2} className={classes.owner}>
                        <Grid item xs={4} >
                            <Paper className={classes.paper}>
                                <MailIcon style={{ fontSize: 200 }} />
                                <Typography>
                                    Hello World
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <HomeIcon style={{ fontSize: 200 }} />
                                <Typography>
                                    Hello World
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <PhoneIphoneIcon style={{ fontSize: 200 }} />
                                <Typography>
                                    +08x-xxx-xxxx
                                </Typography>
                            </Paper>
                        </Grid>


                    </Grid>
                </div>
            </Container>
            <Grid container spacing={2} className={classes.owner}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                  <div >
                    <div className="clearfix" >
                      <div className="animated fadeIn">
                        <div className="card-body">
                          <div className="crop">
                            <img className="crop"
                              src="https://i.pinimg.com/originals/11/e5/ce/11e5ce70c99c662f2e4c1127400d6756.jpg" alt="Narok"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                        <Typography>
                            Imron Y.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                    <div >
                    <div className="clearfix" >
                      <div className="animated fadeIn">
                        <div className="card-body">
                          <div className="crop">
                            <img className="crop"
                              src="https://s.isanook.com/wo/0/ui/33/168683/roses_are_rosie_122070817_1754447088045232_4791777944367399622_n.jpg" alt="Narok"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                        <Typography>
                            Chittawan W.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                    <div >
                    <div className="clearfix" >
                      <div className="animated fadeIn">
                        <div className="card-body">
                          <div className="crop">
                            <img className="crop"
                              src="https://t1.daumcdn.net/news/201807/21/newsen/20180721171237719gxbl.jpg" alt="Narok"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                        <Typography>
                            Jittiwat M.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                    <div >
                    <div className="clearfix" >
                      <div className="animated fadeIn">
                        <div className="card-body">
                          <div className="crop">
                            <img className="crop"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Prayuth_2018_cropped.jpg/220px-Prayuth_2018_cropped.jpg" alt="Narok"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                        <Typography>
                            Unknown #13649
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        </>

    )

}
export default Contact;