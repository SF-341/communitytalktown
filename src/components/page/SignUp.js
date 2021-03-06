import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

// css
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, FormHelperText, InputLabel, MenuItem, FormControl, Select, Paper } from '@material-ui/core';


//Redux stuff
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../redux/actions/userActions';
import { getProvinces, getDistrict, getSubDistrict } from '../../redux/actions/addressAction'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
    },
    formControl: {
        minWidth: (window.innerWidth / 6),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        paddingTop: theme.spacing(2),
        textAlign: 'center',
        maxWidth: (window.innerWidth / 4),
        margin: "auto",
    }
}));

const SignUp = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    const address = useSelector(state => state.address);
    const UI = useSelector(state => state.UI);

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [subdistrict, setSubdistrict] = useState("");
    const wrapper = React.createRef();


    const handleChange = (e) => {
        if (e.target.name === "name") {
            setFirstName(e.target.value)
        } else if (e.target.name === "username") {
            setUsername(e.target.value)
        } else if (e.target.name === "lastname") {
            setLastname(e.target.value)
        } else if (e.target.name === "subdistrict") {
            setSubdistrict(e.target.value)
        } else if (e.target.name === "district") {
            setDistrict(e.target.value)
            dispatch(getSubDistrict(province, e.target.value));
        } else if (e.target.name === "province") {
            setProvince(e.target.value)
            dispatch(getDistrict(e.target.value));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password, confirmPassword } = e.target.elements;
        const newUser = {
            id: uuidv4(),
            firstname,
            lastname,
            username,
            email: email.value,
            subdistrict,
            district,
            province,
            likes: [],
            comments: [],
            createAt: new Date(),
            image: null,
        }
        const user = {
            email: email.value,
            password: password.value,
        }

        if (password.value !== confirmPassword.value) {
            alert("passwords are not the same");
        } else {
            dispatch(register(newUser, user));
        }
    }

    useEffect(() => {

        if (address.provinces === null) {
            dispatch(getProvinces());
        }

    }, [])



    const classes = useStyles();

    if (state.authenticated) {
        return <Redirect to="/" />
    }


    return (
        <>
            <div className="container mt-5" ref={wrapper}>
                <Paper className={classes.paper}>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            {/* <Grid item xs><TextField type="text" label="Name" name="name"  onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField label="Lastname" name="lastname"  onChange={handleChange} required /></Grid> */}
                            <Grid item xs><TextField className={classes.formControl} type="text" label="Username" name="username" onChange={handleChange} required /></Grid>
                            {/* </Grid> */}

                            {/* <Grid container spacing={3}> */}
                            <Grid item xs={12}><TextField className={classes.formControl} type="email" label="Email address" name="email" onChange={handleChange} required /></Grid>
                            <Grid item xs={12}><TextField className={classes.formControl} error={!UI.loading && UI.error != null} type="password" label="Password" name="password" onChange={handleChange} required />
                                {!UI.loading && UI.error != null ? <FormHelperText error id="component-error-text">{UI.error}</FormHelperText> : ''}
                            </Grid>
                            <Grid item xs={12}><TextField className={classes.formControl} error={!UI.loading && UI.error != null} type="password" label="Confirm Password" name="confirmPassword" onChange={handleChange} required /></Grid>

                            {/* <Grid container spacing={3}> */}
                            <Grid item xs={12}><FormControl className={classes.formControl} >
                                <InputLabel id="province"  >province</InputLabel>
                                <Select labelId="province" id="province" name="province" value={province} onChange={handleChange} disabled={address.loading}>

                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {address.provinces ? address.provinces.map((data) => (<MenuItem key={data.key} value={data.province}>{data.province}</MenuItem>)) : ""}

                                </Select>
                            </FormControl></Grid>
                            <Grid item xs={12}><FormControl className={classes.formControl}>
                                <InputLabel id=""  >district</InputLabel>
                                <Select labelId="district" id="district" name="district" value={district} onChange={handleChange} disabled={address.loading}>

                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {address.district ? address.district.map((item) => (<MenuItem key={item.key} value={item.district}>{item.district}</MenuItem>)) : ""}

                                </Select>
                            </FormControl></Grid>
                            {/* <Grid item xs><FormControl className={classes.formControl}>
                            <InputLabel id=""  >subdistrict</InputLabel>
                            <Select labelId="subdistrict" id="subdistrict" name="subdistrict" value={subdistrict} onChange={handleChange} disabled={address.loading}>

                                <MenuItem value=""><em>None</em></MenuItem>
                                {address.subdistrict ? address.subdistrict.map((item) => (<MenuItem key={item.key} value={item.subdistrict}>{item.subdistrict}</MenuItem>)) : ""}

                            </Select>
                        </FormControl></Grid> */}

                            {/* </Grid> */}
                        </Grid>

                        <Button type="submit" size="large" variant="outlined">Submit</Button>
                    </form>
                </Paper>

            </div>
        </>
    )
}

export default SignUp;
