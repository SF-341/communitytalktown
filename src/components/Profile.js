import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button } from '@material-ui/core';
import { firestore } from '../config'
import { AuthContext } from './Auth'
import FethUser from './FethUser'


const Profile = () => {

  const { currentUser } = useContext(AuthContext);
  const  data  = FethUser();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [subDistrict, setSubDistrict] = useState();
  const [district, setDistrict] = useState();
  const [province, setProvince] = useState();
  const [submit, setSubmit] = useState(true);
  const [text, setText] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  function setData() {
    setFirstName(data.data.name);
    setLastName(data.data.lastname);
    setUserName(data.data.username);
    setEmail(data.data.email);
    setSubDistrict(data.data.subdistrict);
    setDistrict(data.data.district);
    setProvince(data.data.province);
  }

  if(isLoading){
    if(data.loading){
      setData()
      setIsLoading(false);
    }
  }


  const handleChange = (e) => {
    if (e.target.name === "firstname") {
      setFirstName(e.target.value)
    } else if (e.target.name === "username") {
      setUserName(e.target.value)
    } else if (e.target.name === "lastname") {
      setLastName(e.target.value)
    } else if (e.target.name === "subdistrict") {
      setSubDistrict(e.target.value)
    } else if (e.target.name === "district") {
      setDistrict(e.target.value)
    } else if (e.target.name === "province") {
      setProvince(e.target.value)
    }
  }

  const edit = () => {
    setFirstName("Asdsad");
    setSubmit(false);
    setText(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const ref = firestore.doc("User/" + data.id);
    try {
      ref.update({
        name: firstName,
        lastname: lastName,
        username: userName,
        subdistrict: subDistrict,
        district: district,
        province: province,
      }).then(function () {
        setSubmit(true);
        setText(true);
      });
    } catch (error) {
      alert(error);
    }
  }


  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (

    <div className="container mt-5">
      {!currentUser ? <Redirect to="/" /> : ""}
      {!isLoading ? <><h1>Profile</h1>
      <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={5}>
          <Grid item xs={8}><TextField label="Name" name="firstname" className="form-control" disabled={text} defaultValue={firstName} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField label="Lastname" name="lastname" className="form-control" disabled={text} defaultValue={lastName} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField label="Username" name="username" className="form-control" disabled={text} defaultValue={userName} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField label="Email" name="email" className="form-control" disabled defaultValue={email} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField label="Sub-district" name="subdistrict" className="form-control" disabled={text} defaultValue={subDistrict} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField label="District" name="district" className="form-control" disabled={text} defaultValue={district} onChange={handleChange} /></Grid>
          <Grid item xs={8}><TextField label="Province" name="province" className="form-control" disabled={text} defaultValue={province} onChange={handleChange} /></Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item ><Button size="large" variant="outlined" onClick={edit}>Edit</Button></Grid>
          <Grid item ><Button type="submit" size="large" variant="outlined" disabled={submit}>Submit</Button></Grid>
        </Grid>

      </form></> : ""}
      
    </div>
  );
}

export default Profile;
