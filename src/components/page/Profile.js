import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, IconButton, styled, Paper } from '@material-ui/core';
import CameraAltOutlined from '@material-ui/icons/CameraAltOutlined';
import '../css/Profile.css'

import Loading from '../UI/Loading'

// Redux stuff
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, updateUserImage, refreshUserData } from '../../redux/actions/userActions'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  TextInput: {
    minWidth: 300
  },
  purple: {

    width: theme.spacing(1),
    height: theme.spacing(1),
  },
  content: {
    textAlign: 'webkit-center',
  },
  boxupload: {
    textAlign: 'webkit-center',
  },
}));

const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.user)
  const UI = useSelector(state => state.UI)
  const { currentUser } = useContext(AuthContext);


  const [firstName, setFirstName] = useState(state.firstname);
  const [lastName, setLastName] = useState(state.lastname);
  const [userName, setUserName] = useState(state.username);
  const [submit, setSubmit] = useState(true);
  const [uploadProfile, setUploadProfile] = useState(false);
  const [text, setText] = useState(true);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "firstname") {
      setFirstName(e.target.value)
    } else if (e.target.name === "username") {
      setUserName(e.target.value)
    } else if (e.target.name === "lastname") {
      setLastName(e.target.value)
    } else if (e.target.name === "image") {
      setUploadProfile(true)
      console.log(e.target.files[0]);
      setImage(e.target.files[0])
    }
  }

  const Input = styled('input')({
    display: 'none',
  });

  const edit = () => {
    setSubmit(false);
    setText(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstname: firstName,
      lastname: lastName,
      username: userName,
    }

    if (dispatch(updateUser(data))) {
      setSubmit(true);
      setText(true);
    }
  }

  const updateImage = (e) => {
    setImage(null);
    setUploadProfile(false);
    e.preventDefault();
    dispatch(updateUserImage(image))
  }

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
      dispatch(refreshUserData());

    }

  }, [])

  const classes = useStyles();

  if (!currentUser) {
    return <Redirect to="/login" />
  }

  return (
    <>
      < div className="container mt-5" >
        {
          UI.loading && state.authenticated ? <Loading /> : (
            <Paper variant="elevation" elevation={5}>
              <Grid container >
                <Grid item xs={8}>
                  <><h1>Profile</h1>
                    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                      <Grid container spacing={5}>
                        <Grid item xs={8}><TextField className={classes.TextInput} variant="filled" label="Name" name="firstname" disabled={text} defaultValue={state.firstname} onChange={handleChange} /></Grid>
                        <Grid item xs={8}><TextField className={classes.TextInput} variant="filled" label="Lastname" name="lastname" disabled={text} defaultValue={state.lastname} onChange={handleChange} /></Grid>
                        <Grid item xs={8}><TextField className={classes.TextInput} variant="filled" label="Username" name="username" disabled={text} defaultValue={state.username} onChange={handleChange} /></Grid>
                        <Grid item xs={8}><TextField className={classes.TextInput} variant="filled" label="Email" name="email" disabled defaultValue={state.email} onChange={handleChange} /></Grid>
                        <Grid item xs={8}><TextField className={classes.TextInput} variant="filled" label="Sub-district" name="subdistrict" disabled defaultValue={state.subdistrict} onChange={handleChange} /></Grid>
                        <Grid item xs={8}><TextField className={classes.TextInput} variant="filled" label="District" name="district" disabled defaultValue={state.district} onChange={handleChange} /></Grid>
                        <Grid item xs={8}><TextField className={classes.TextInput} variant="filled" label="Province" name="province" disabled defaultValue={state.province} onChange={handleChange} /></Grid>
                      </Grid>
                      <Grid container spacing={5}>
                        <Grid item ><Button size="large" variant="outlined" onClick={edit}>Edit</Button></Grid>
                        <Grid item ><Button type="submit" size="large" variant="outlined" disabled={submit}>Submit</Button></Grid>
                      </Grid>
                    </form>
                  </>
                </Grid>
                <Grid item xs={4}  >
                  <>
                    <div >
                      <div className="clearfix" >
                        <div className="animated fadeIn">
                          <div className="card-body">
                            <div className="avatar">
                              <img className="avatar"
                                src={state.image}
                              />
                            </div>
                            <div style={{ textAlign: '-webkit-center', display: "inline-flex", paddingTop: "20px" }}>
                              <h5 style={{ margin: "auto" }}>  {state.firstname}</h5>&nbsp;&nbsp;&nbsp;
                              <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} name="image" />

                                {image && uploadProfile ? <Button onClick={updateImage} type="button" aria-label="updateImg">UPDATE</Button> :
                                  <IconButton aria-label="upload picture" component="span">
                                    <CameraAltOutlined />
                                  </IconButton>}
                              </label>
                            </div>
                            <br />
                            {image && image.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </Grid>
              </Grid>
            </Paper>
          )
        }
      </div >
    </>








  );
}

export default Profile;
