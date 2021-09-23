import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import firebaseConfig from '../config'
import { v4 as uuidv4 } from 'uuid'


import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




const SignUp = () => {

    const ref = firebaseConfig.firestore().collection("User");

    const [dataProvince, setDataProvince] = useState();
    const [dataDistrict, setDataDistrict] = useState();
    const [dataSubDistrict, setDataSubDistrict] = useState();


    const [currentUser, setCurrentUser] = useState(null);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [subdistrict, setSubdistrict] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const wrapper = React.createRef();

    const addUser = () => {
        const newUser = {
            id: uuidv4(),
            name, 
            lastname, 
            username, 
            email, 
            subdistrict, 
            district, 
            province
        }
        ref.doc(newUser.id).set(newUser).catch((error) => {alert(error.message);});

    }

    async function QueryProvinces() {

        await fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces", {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                const temp = [];
                result.data.forEach(function (item, index) {
                    temp.push({
                        key: index,
                        province: item.province,
                    })
                });
                console.log(temp);
                setDataProvince(temp);

            })

    }

    async function QueryDistrict(province) {

        await fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/" + province + "/district", {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                const temp = [];
                result.data.forEach(function (item, index) {
                    temp.push({
                        key: index,
                        district: item,
                    })
                });
                console.log(temp);
                setDataDistrict(temp);
            })
    }

    async function QuerySubDistrict(district) {

        await fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/" + province + "/district/" + district, {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                const temp = [];
                result.data.forEach(function (item, index) {
                    temp.push({
                        key: index,
                        subdistrict: item,
                    })
                });
                console.log(temp);
                setDataSubDistrict(temp);
            })

    }


    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value)
        } else if (e.target.name === "username") {
            setUsername(e.target.value)
        } else if (e.target.name === "email") {
            setEmail(e.target.value)
        } else if (e.target.name === "lastname") {
            setLastname(e.target.value)
        } else if (e.target.name === "subdistrict") {
            setSubdistrict(e.target.value)
        } else if (e.target.name === "district") {
            setDistrict(e.target.value)
            QuerySubDistrict(e.target.value);
        } else if (e.target.name === "province") {
            setProvince(e.target.value)
            QueryDistrict(e.target.value);
        }
    }




    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password, confirmPassword } = e.target.elements;

        if (password.value !== confirmPassword.value) {
            alert("passwords are not the same");
        } else {
            try {
                firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value).then(() => {
                    setCurrentUser(true);
                    addUser();
                })

            } catch (error) {
                alert(error.message);
            }
        }

    }

    useEffect(() => {
        if (isLoading) {
            QueryProvinces()
            console.log(dataProvince);
            setIsLoading(false);
        }
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(7),

            },
        },
        formControl: {
            minWidth: (window.innerWidth/6),
            
            
            
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();



    if (currentUser) {
        return <Redirect to="/dashboard" />
    }


    return (
        <>
            <div className="container mt-5" ref={wrapper}>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs><TextField type="text" label="Name" name="name" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField label="Lastname" name="lastname" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField type="text" label="Username" name="username" className="form-control" onChange={handleChange} required /></Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs><FormControl className={classes.formControl} >
                            <InputLabel id="province"  >province</InputLabel>
                            <Select labelId="province" id="province" name="province" value={province} onChange={handleChange}>

                                <MenuItem value=""><em>None</em></MenuItem>
                                {dataProvince ? dataProvince.map((data) => (<MenuItem key={data.key} value={data.province}>{data.province}</MenuItem>)) : ""}

                            </Select>
                        </FormControl></Grid>
                        <Grid item xs><FormControl >
                            <InputLabel id=""  >district</InputLabel>
                            <Select labelId="district" id="district" name="district" value={district} onChange={handleChange}>

                                <MenuItem value=""><em>None</em></MenuItem>
                                {dataDistrict ? dataDistrict.map((item) => (<MenuItem key={item.key} value={item.district}>{item.district}</MenuItem>)) : ""}

                            </Select>
                        </FormControl></Grid>
                        <Grid item xs><FormControl className={classes.formControl}>
                            <InputLabel id=""  >subdistrict</InputLabel>
                            <Select labelId="subdistrict" id="subdistrict" name="subdistrict" value={subdistrict} onChange={handleChange}>

                                <MenuItem value=""><em>None</em></MenuItem>
                                {dataSubDistrict ? dataSubDistrict.map((item) => (<MenuItem key={item.key} value={item.subdistrict}>{item.subdistrict}</MenuItem>)) : ""}

                            </Select>
                        </FormControl></Grid>

                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs><TextField type="email" label="Email address" name="email" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField type="password" label="Password" name="password" className="form-control" onChange={handleChange} required /></Grid>
                        <Grid item xs><TextField type="password" label="Confirm Password" name="confirmPassword" className="form-control" onChange={handleChange} required /></Grid>
                    </Grid>


                    <Button type="submit" size="large" variant="outlined">Submit</Button>
                </form>
            </div>
        </>
    )
}

export default SignUp;
